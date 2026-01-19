const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const Review = require("./routes/Review.js");
const ejsMate = require("ejs-mate");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const wrap = require("./uii/wrap.js");
const path = require("path");
const listing = require("./routes/listing.js");
const Express = require("./uii/express.js");
const { title } = require("process");
const session = require("express-session");
const connectflash = require("connect-flash");
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/manag");
}

const se = {
  secret: "thisisasecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.use(session(se));
app.use(connectflash());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.error("connection noo:", err);
  });

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

app.get("/", (req, res) => {
  res.send("homme pagees");
});

//index
app.use("/", listing);
app.use("/listing/:id/review", Review);

app.use((req, res, next) => {
  let err = new Express("Page Not Found", 404);
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.render("listing/err", {
    status: err.statusCode || 500,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log("Herre is on world");
});
