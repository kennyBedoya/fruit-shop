
const express = require("express");
const bcrypt = require("bcrypt");
const { getDB } = require("./database");

const router = express.Router();

// POST /auth/login
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                message: "El correo y la contraseña son obligatorios."
            });
        }

        const db = getDB();

        const [rows] = await db.execute(
            `SELECT
                u.id_usuario,
                u.nombre,
                u.apellidos,
                u.correo,
                u.activo,
                p.password_hash
            FROM usuarios u
            INNER JOIN passwords p
                ON p.usuario_id = u.id_usuario
            WHERE u.correo = ?
            LIMIT 1`,
            [correo.trim()]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Correo o contraseña incorrectos."
            });
        }

        const user = rows[0];

        if (!user.activo) {
            return res.status(403).json({
                message: "El usuario está inactivo."
            });
        }

        const passwordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Correo o contraseña incorrectos."
            });
        }

        req.session.user = {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellidos: user.apellidos,
            correo: user.correo
        };

        req.session.save((err) => {
            if (err) {
                console.error("Error creando sesión:", err);

                return res.status(500).json({
                    message: "No fue posible iniciar la sesión."
                });
            }

            return res.status(200).json({
                message: "Inicio de sesión exitoso.",
                user: req.session.user
            });
        });
    } catch (err) {
        console.error("Error en login:", err);

        return res.status(500).json({
            message: "Error interno al iniciar sesión."
        });
    }
});

// GET /auth/me
router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "No hay una sesión activa."
        });
    }

    return res.status(200).json({
        user: req.session.user
    });
});

// POST /auth/logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error cerrando sesión:", err);

            return res.status(500).json({
                message: "No fue posible cerrar la sesión."
            });
        }

        res.clearCookie("tienda.sid");

        return res.status(200).json({
            message: "Sesión cerrada correctamente."
        });
    });
});

module.exports = router;
