
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const { connectDB } = require("./services/database");

const usuarios = require("./services/usuarios");
const cuentas = require("./services/cuentas");
const transacciones = require("./services/transacciones");
const auth = require("./services/auth");

const app = express();

const sessionStore = new MySQLStore({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "fruteria",
    createDatabaseTable: true,
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 8 * 60 * 60 * 1000
});

sessionStore.on("error", (error) => {
    console.error("Error en el almacén de sesiones:", error);
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    name: "tienda.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 8 * 60 * 60 * 1000
    }
}));

async function start() {
    try {
        await connectDB();

        app.use("/auth", auth);
        app.use("/usuarios", usuarios);
        app.use("/cuentas", cuentas);
        app.use("/transacciones", transacciones);

        app.listen(3000, () => {
            console.log("Servidor iniciado en puerto 3000");
        });
    } catch (err) {
        console.error("Error iniciando el servidor:", err);
    }
}

start();
