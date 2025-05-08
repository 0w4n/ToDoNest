import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = Router();

routes.get("/ideas", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/ideas.html"));
});

routes.get("/meet", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/meet/index.html"));
});

routes.get("/time", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/components/cycle-study.html"));
});

export default routes;