const express = require("express");
const { getDB } = require("./database");

const router = express.Router();



// =======================
// GET - Todas las cuentas
// Solo usuarios activos
// =======================
router.get("/", async (req, res) => {

    try {
        const db = getDB();
        const [rows] = await db.execute(`
            SELECT
                c.id_cuentas,
                c.usuario_id,
                c.saldo_anterior,
                c.saldo_actual,
                c.ultima_transaccion_id,
                c.acudiente_id
            FROM cuentas c
            INNER JOIN usuarios u
                ON u.id_usuario = c.usuario_id
            WHERE u.activo = 1
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
// GET - Cuenta por usuario
// =======================
router.get("/:usuarioId", async (req, res) => {

    try {
        const db = getDB();
        const [rows] = await db.execute(`
            SELECT
                c.id_cuentas,
                c.usuario_id,
                c.saldo_anterior,
                c.saldo_actual,
                c.ultima_transaccion_id,
                c.acudiente_id
            FROM cuentas c
            INNER JOIN usuarios u
                ON u.id_usuario = c.usuario_id
            WHERE
                c.usuario_id = ?
                AND u.activo = 1
        `, [req.params.usuarioId]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cuenta no encontrada"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// =======================
// POST - Crear cuenta
// =======================
router.post("/", async (req, res) => {

    const {
        usuario_id,
        saldo_anterior,
        saldo_actual,
        ultima_transaccion_id,
        acudiente_id
    } = req.body;

    try {
        const db = getDB();
        // Verificar que el usuario exista y esté activo
        const [usuario] = await db.execute(
            "SELECT id_usuario FROM usuarios WHERE id_usuario = ? AND activo = 1",
            [usuario_id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no existe o está inactivo"
            });
        }

        const [result] = await db.execute(
            `INSERT INTO cuentas
            (usuario_id, saldo_anterior, saldo_actual, ultima_transaccion_id, acudiente_id)
            VALUES (?, ?, ?, ?, ?)`,
            [
                usuario_id,
                saldo_anterior,
                saldo_actual,
                ultima_transaccion_id,
                acudiente_id
            ]
        );

        const [cuenta] = await db.execute(
            "SELECT * FROM cuentas WHERE id_cuentas = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Cuenta creada",
            data: cuenta[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// =======================
// PUT - Actualizar cuenta
// =======================
router.put("/:usuarioId", async (req, res) => {

    const {
        saldo_anterior,
        saldo_actual,
        ultima_transaccion_id,
        acudiente_id
    } = req.body;

    try {
        const db = getDB();
        const [result] = await db.execute(
            `UPDATE cuentas
             SET
                saldo_anterior = ?,
                saldo_actual = ?,
                ultima_transaccion_id = ?,
                acudiente_id = ?
             WHERE usuario_id = ?`,
            [
                saldo_anterior,
                saldo_actual,
                ultima_transaccion_id,
                acudiente_id,
                req.params.usuarioId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cuenta no encontrada"
            });
        }

        const [cuenta] = await db.execute(
            "SELECT * FROM cuentas WHERE usuario_id = ?",
            [req.params.usuarioId]
        );

        res.json({
            success: true,
            message: "Cuenta actualizada",
            data: cuenta[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;