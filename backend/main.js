const express = require("express");

const { connectDB } = require("./services/database");

const usuarios = require("./services/usuarios");
const cuentas = require("./services/cuentas");
const transacciones = require("./services/transacciones");

const app = express();

app.use(express.json());

async function start() {

    try {

        await connectDB();

        app.use("/usuarios", usuarios);
        app.use("/cuentas", cuentas);
        app.use("/transacciones", transacciones);

        app.listen(3000, () => {
            console.log("Servidor iniciado en puerto 3000");
        });

    } catch (err) {

        console.error(err);

    }

}

start();