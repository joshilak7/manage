const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const mongo = require("./models/listing.js");
const List = require("./models/listing.js");
const Review = require("./models/re.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
const wrap = require("./uii/wrap.js");
const path = require("path");
const Express = require("./uii/express.js");
const listingSchema = require("./uii/joy.js");
const reviewSchema = require("./uii/joy.js");
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

app.get("/", (req, res) => {
  res.send("homme pagees");
});

app.get("/listing/neww", (req, res) => {
  res.render("listing/new");
});

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new Express(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new Express(msg, 400);
  } else {
    next();
  }
};
//index
app.get(
  "/listing",
  wrap(async (req, res) => {
    const all = await mongo.find({});
    res.render("listing/index", { all });
  })
);

app.get(
  "/listing/:id",
  wrap(async (req, res) => {
    let { id } = req.params;
    const allListing = await mongo.findById(id).populate("reviews");
    const reviews = await Review.findById(id);
    res.render("listing/all", { allListing });
  })
);

app.post(
  "/listi",
  validateListing,
  wrap(async (req, res) => {
    listingSchema.validate(req.body);
    const { title, description, price, location, img, country } = req.body;
    console.log(title, description, price, location, img, country);
    let newlist = new List(req.body);
    await newlist.save();
    res.redirect("/listing");
  })
);

app.delete(
  "/listing/:id",
  wrap(async (req, res) => {
    const { id } = req.params;
    await mongo.findByIdAndDelete(id);
    res.redirect("/listing");
  })
);

app.get(
  "/listing/:id/edit",
  wrap(async (req, res) => {
    let { id } = req.params;
    let connect = await mongo.findById(id);
    res.render("listing/edit", { connect });
  })
);

app.put(
  "/listing/edit/:id",
  validateListing,
  wrap(async (req, res) => {
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
  })
);

app.post("/listing/:id/review", validateReview, async (req, res) => {
  let li = await List.findById(req.params.id).populate("reviews");
  const re = new Review(req.body.review);
  re.list = li._id;
  li.reviews.push(re);
  await re.save();
  await li.save();
  console.log(li.reviews);
  res.redirect(`/listing/${li._id}`);
});

app.delete(
  "/listing/:id/review/:reviewId",
  wrap(async (req, res) => {
    const { id, reviewId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
  })
);

app.use((req, res, next) => {
  let err = new Express("Page Not Found", 404);
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.render("listing/err", {
    status: err.statusCode || 500, // agar err.statusCode undefined ho to 500 use hoga
    message: err.message,
  });
});

app.listen(port, () => {
  console.log("Herre is on world");
});
