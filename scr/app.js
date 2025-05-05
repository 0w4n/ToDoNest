import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "node:fs/promises";

const port = 5500;
const app = express();

import { routes } from "./routes/router.js";

// Corrección para obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// Habilita CORS para todas las solicitudes
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public"))); // Ruta absoluta para archivos estáticos

// Rutas
// Ruta para servir el JSON
routes.get("/conceptos", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "conceptos.json"),
      "utf8"
    );
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error al leer el archivo" });
  }
});

routes.get("/data", async (req, res) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "scr/data.json"),
      "utf8"
    );
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error al leer el archivo" });
  }
});

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

routes.get("/card", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "card.html"));
});

routes.get("/dev", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "new-index.html"));
});

// Lanzamiento del servidor
export default app;
