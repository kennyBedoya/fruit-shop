const mysql = require("mysql2/promise");

let connection = null;

const dbConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "fruteria"
};

async function connectDB() {

    if (connection) {
        return connection;
    }

    connection = await mysql.createConnection(dbConfig);

    console.log("Conectado a MySQL");

    return connection;

}

function getDB() {

    if (!connection) {
        throw new Error("La base de datos aún no ha sido inicializada.");
    }

    return connection;

}

module.exports = {
    connectDB,
    getDB
};