import express from "express";
import path from "path";
import { fileURLToPath } from "url";  // Esto es parte de Node.js, no es una librería extra

const port = 5500;
const app = express();

// Corrección para obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));  // Ruta absoluta para archivos estáticos

// Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/dev", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "new-index.html"));
});

// Lanzamiento del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando el puerto ${port}: http://localhost:${port}`);
  console.log(`Directorio raíz: ${__dirname}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
