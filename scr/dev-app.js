import app from "./app.js";

const port = 5500;

app.listen(port, () => {
    console.log(
        `Servidor escuchando el puerto ${port}: http://127.0.0.1:${port}`
    );
    })
    .on("error", (err) => {
    console.error("Error al iniciar el servidor:", err);
    });