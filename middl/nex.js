const express = require("express");
const app = express();
const errx = require("./err");
const { STATES } = require("mongoose");

app.use("/err", (req, res, next) => {
  console.log("middleware called");
  throw new errx(401, "You are not authorized");
  next();
});

app.get("/err", (req, res) => {
  abc = abc; // ReferenceError
  res.send("Data");
});

app.get("/adm", (req, res) => {
  throw new errx(403, "You are not admin");
});

app.use((err, req, res, next) => {
  console.log("errrrrrorrr");
  const status = err.status || 500;
  res.status(status).send("Error: " + err.message);
});

app.listen(3000, () => {
  console.log("listen now ::");
});
