const express = require("express");
const { getDB } = require("./database");

const router = express.Router();

// =======================
// GET - Todas las transacciones
// =======================
router.get("/", async (req, res) => {

    try {

        const db = getDB();

        const [rows] = await db.execute(`
            SELECT
                t.id_transacciones,
                t.usuario_id,
                u.nombre,
                u.apellidos,
                t.tipo_transaccion_id,
                t.monto,
                t.saldo_anterior,
                t.saldo_actual,
                t.medio_pago_id,
                t.estado,
                t.descripcion,
                t.created_at,
                t.updated_at
            FROM transacciones t
            INNER JOIN usuarios u
                ON t.usuario_id = u.id_usuario
            ORDER BY t.created_at DESC
        `);

        res.json({
            success: true,
            data: rows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// =======================
// POST - Crear transacción
// =======================
router.post("/", async (req, res) => {

    const {
        usuario_id,
        tipo_transaccion_id,
        monto,
        medio_pago_id,
        descripcion
    } = req.body;

    try {

        // =======================
        // Validaciones básicas
        // =======================

        if (!usuario_id) {
            return res.status(400).json({
                success: false,
                message: "El usuario_id es obligatorio"
            });
        }

        if (!tipo_transaccion_id) {
            return res.status(400).json({
                success: false,
                message: "El tipo_transaccion_id es obligatorio"
            });
        }

        if (monto === undefined || monto === null) {
            return res.status(400).json({
                success: false,
                message: "El monto es obligatorio"
            });
        }

        if (Number(monto) <= 0) {
            return res.status(400).json({
                success: false,
                message: "El monto debe ser mayor que cero"
            });
        }

        const db = getDB();

        // =======================
        // Obtener cuenta
        // =======================

        const [accounts] = await db.execute(`
            SELECT
                id_cuentas,
                usuario_id,
                saldo_actual
            FROM cuentas
            WHERE usuario_id = ?
            LIMIT 1
        `, [usuario_id]);

        if (accounts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "El usuario no tiene una cuenta"
            });
        }

        const account = accounts[0];

        const saldoAnterior = Number(account.saldo_actual);
        const montoNumber = Number(monto);

        // =======================
        // Calcular nuevo saldo
        // =======================

        let saldoActual;

        // 1 = Crédito
        // 2 = Pago

        if (Number(tipo_transaccion_id) === 1) {

            // Crédito aumenta el saldo
            saldoActual = saldoAnterior + montoNumber;

        } else if (Number(tipo_transaccion_id) === 2) {

            // Pago disminuye el saldo
            saldoActual = saldoAnterior - montoNumber;

            // No permitir saldo negativo
            if (saldoActual < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Saldo insuficiente"
                });
            }

        } else {

            return res.status(400).json({
                success: false,
                message: "Tipo de transacción no válido"
            });

        }

        // =======================
        // Crear transacción
        // =======================

        const [result] = await db.execute(`
            INSERT INTO transacciones (
                usuario_id,
                tipo_transaccion_id,
                monto,
                saldo_anterior,
                saldo_actual,
                medio_pago_id,
                estado,
                descripcion,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
            usuario_id,
            tipo_transaccion_id,
            montoNumber,
            saldoAnterior,
            saldoActual,
            medio_pago_id || null,
            "completada",
            descripcion || null
        ]);

        // =======================
        // Actualizar saldo cuenta
        // =======================

        await db.execute(`
            UPDATE cuentas
            SET
                saldo_anterior = saldo_actual,
                saldo_actual = ?,
                ultima_trasaccion_id = ?
            WHERE id_cuentas = ?
        `, [
            saldoActual,
            result.insertId,
            account.id_cuentas
        ]);

        // =======================
        // Obtener transacción creada
        // =======================

        const [transaction] = await db.execute(`
            SELECT
                t.id_transacciones,
                t.usuario_id,
                u.nombre,
                u.apellidos,
                t.tipo_transaccion_id,
                t.monto,
                t.saldo_anterior,
                t.saldo_actual,
                t.medio_pago_id,
                t.estado,
                t.descripcion,
                t.created_at,
                t.updated_at
            FROM transacciones t
            INNER JOIN usuarios u
                ON t.usuario_id = u.id_usuario
            WHERE t.id_transacciones = ?
        `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: "Transacción creada correctamente",
            data: transaction[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


module.exports = router;