const express = require("express");
const port = 3000;
const app = express();
const cokkieParser = require("cookie-parser");

app.use(cokkieParser("secretKey"));

app.get("/", (req, res) => {
  res.cookie("username", "john_doe", { signed: true, maxAge: 60000 });
  res.send("Cookie has been set!");
});

app.get("/get", (req, res) => {
  console.log("Cookies:", req.cookies.username);
  console.log("Signed Cookies:", req.signedCookies.username);
  res.json({
    cookies: req.cookies,
    signedCookies: req.signedCookies,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
