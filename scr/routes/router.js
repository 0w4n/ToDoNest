import { Router } from "express";
const routes = Router();

routes.get("/ideas", (res, req) => {
  res.sendfile();
});

routes.get("/meet", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/meet/index.html");
});

routes.get("/time", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/components/cycle-study.html");
});

export default routes;