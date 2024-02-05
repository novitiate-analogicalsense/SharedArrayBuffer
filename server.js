import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve() + "/public"), (req, res, next) => {
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

const port = process.env.PORT || 8080;

app.get("/", function (req, res) {
  res.sendFile(path.join(path.resolve(), "/public/index.html"));
});

app.get("/app", function (req, res) {
  res.sendFile(path.join(path.resolve(), "/public/index.html"));
});

app.get("/wasm", function (req, res) {
  res.sendFile(path.join(path.resolve(), "/public/wasm/add.wasm"));
});

app.get("/worker", function (req, res) {
  res.sendFile(path.join(path.resolve(), "/public/worker.js"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
