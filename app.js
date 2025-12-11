const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const mongo = require("./models/listing.js");
const List = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/manag");
}
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

app.listen(port, () => {
  console.log("Herre is on world");
});

app.get("/", (req, res) => {
  res.send("homme pagees");
});

app.get("/listing/neww", (req, res) => {
  res.render("listing/new");
});

//index
app.get("/listing", async (req, res) => {
  const all = await mongo.find({});
  res.render("listing/index", { all });
});

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const allListing = await mongo.findById(id);
  res.render("listing/all", { allListing });
});

app.post("/listi", async (req, res) => {
  const { title, description, price, location, img, country } = req.body;
  console.log(title, description, price, location, img, country);
  let newlist = new List(req.body);
  await newlist.save();
  res.redirect("/listing");
});

app.delete("/listing/:id", async (req, res) => {
  const { id } = req.params;
  await mongo.findByIdAndDelete(id);
  res.redirect("/listing");
});

app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let connect = await mongo.findById(id);
  res.render("listing/edit", { connect });
});

app.put("/listing/edit/:id", async (req, res) => {
  let { title, description, price, location, img, country } = req.body;
  let { id } = req.params;
  await mongo.findByIdAndUpdate(id, {
    title,
    description,
    price,
    location,
    img,
    country,
  });
  res.redirect(`/listing/${id}`);
});
