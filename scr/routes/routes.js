import { Router } from "express";

Router.get("/ideas", (res, req) => {
  res.sendfile();
});

Router.get("/meet", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/meet/index.html");
});

Router.get("/time", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/components/cycle-study.html");
});

export default Router();