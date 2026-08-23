const express = require("express");
const { getDB } = require("./database");

const router = express.Router();

// =======================
// POST - Crear transacción
// =======================
router.post("/", async (req, res) => {

    const {
        usuario_id,
        tipo_transaccion_id,
        monto,
        saldo_anterior,
        saldo_actual,
        medio_pago_id
    } = req.body;

    try {

        const db = getDB();

        // Validar que el usuario exista y esté activo
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
            `INSERT INTO transacciones
            (
                usuario_id,
                tipo_transaccion_id,
                monto,
                saldo_anterior,
                saldo_actual,
                medio_pago_id
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                usuario_id,
                tipo_transaccion_id,
                monto,
                saldo_anterior,
                saldo_actual,
                medio_pago_id
            ]
        );

        const [transaccion] = await db.execute(
            "SELECT * FROM transacciones WHERE id_transacciones = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Transacción creada correctamente",
            data: transaccion[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// =======================
// GET - Todas las transacciones
// =======================
router.get("/", async (req, res) => {

    try {

        const db = getDB();

        const [rows] = await db.execute(
            "SELECT * FROM transacciones"
        );

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

module.exports = router;