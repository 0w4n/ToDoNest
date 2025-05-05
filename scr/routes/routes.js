import app from "../app";

app.get("/ideas", (res, req) => {
  res.sendfile();
});

app.get("/meet", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/meet/index.html");
});

app.get("/time", (res, req) => {
  res.sendFile(import.meta.dirname + "../public/components/cycle-study.html");
});
