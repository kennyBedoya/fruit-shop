const express = require("express");
const { connectDB, router: usersRouter } = require("./services/usuarios");

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use("/usuarios", usersRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API funcionando"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});