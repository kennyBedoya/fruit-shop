const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

let db;

// Configuración MySQL
const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "fruteria"
};

// Conectar a MySQL
async function connectDB() {
    try {

        db = await mysql.createConnection(dbConfig);

        console.log("Conectado a MySQL");

    } catch (err) {

        console.error("Error de conexión:", err);

    }
}

// =======================
// GET - Todos los usuarios
// =======================
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.execute(
            "SELECT * FROM usuarios WHERE activo = 1"
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

// =======================
// GET - Usuario por ID
// =======================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await db.execute(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
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
// POST - Crear usuario
// =======================
router.post("/", async (req, res) => {
    

    const { name, surname, type, phone, email, age, institution } = req.body;

    try {
        
        const [result] = await db.execute(
            "INSERT INTO usuarios (nombre, apellidos, tipo_usuario, telefono, correo, activo, institucion, edad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [name, surname, type, phone, email, 1, institution, age]
        );

        const [user] = await db.execute(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: "Usuario creado",
            data: user[0]
        });

    } catch (err) {
        
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// =======================
// PUT - Actualizar usuario
// =======================
router.put("/:id", async (req, res) => {

    const { name, surname, type, phone, email, age, institution } = req.body;

    try {

        const [result] = await db.execute(
    `UPDATE usuarios
     SET nombre = ?,
         apellidos = ?,
         tipo_usuario = ?,
         telefono = ?,
         correo = ?,
         activo = 1,
         institucion = ?,
         edad = ?
     WHERE id_usuario = ?`,
    [name, surname, type, phone, email, institution, age, req.params.id]
);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const [user] = await db.execute(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Usuario actualizado",
            data: user[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// =======================
// DELETE - Eliminar usuario
// =======================
router.delete("/:id", async (req, res) => {

    try {

        const [user] = await db.execute(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [req.params.id]
        );

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        await db.execute(
           // "DELETE FROM usuarios WHERE id_usuario = ?",
           "UPDATE usuarios SET activo = 0 WHERE id_usuario = ?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Usuario eliminado",
            data: user[0]
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = {
    connectDB,
    router
};