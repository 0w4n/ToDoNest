import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "node:fs/promises";

const app = express();

import routes from "./routes/router.js";

// Corrección para obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// Habilita CORS para todas las solicitudes
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public"))); // Ruta absoluta para archivos estáticos


app.use("/", routes);

// Rutas
// Ruta para servir el JSON
app.get("/conceptos", async (req, res) => {
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

app.get("/data", async (req, res) => {
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/card", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "card.html"));
});

app.get("/dev", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "new-index.html"));
});

// Lanzamiento del servidor
export default app;
