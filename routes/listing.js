const express = require("express");
const mongo = require("../models/listing.js");
const List = require("../models/listing.js");
const Express = require("../uii/express.js");
const { listingSchema } = require("../uii/joy.js");
const wrap = require("../uii/wrap.js");
const router = express.Router();

const validateListing = (req, res, next) => {
  console.log(req.body);
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new Express(msg, 400);
  } else {
    next();
  }
};

router.get("/listing/neww", (req, res) => {
  res.render("listing/new");
});

router.get(
  "/listing",
  wrap(async (req, res) => {
    const all = await mongo.find({});
    res.render("listing/index", { all });
  }),
);

router.get(
  "/listing/:id",
  wrap(async (req, res) => {
    let { id } = req.params;
    const allListing = await mongo.findById(id).populate("reviews");
    res.render("listing/all", { allListing });
  }),
);

router.post(
  "/listing",
  validateListing,
  wrap(async (req, res) => {
    listingSchema.validate(req.body);
    const { title, description, price, location, img, country } = req.body;
    console.log(title, description, price, location, img, country);
    let newlist = new List(req.body);
    await newlist.save();
    req.flash("success", "Listing Created Successfully");
    res.redirect("/listing");
  }),
);

router.delete(
  "/listing/:id",
  wrap(async (req, res) => {
    const { id } = req.params;
    await mongo.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully");
    res.redirect("/listing");
  }),
);

router.get(
  "/listing/:id/edit",
  wrap(async (req, res) => {
    let { id } = req.params;
    let connect = await mongo.findById(id);
    req.flash("success", "Listing Edited Successfully");
    res.render("listing/edit", { connect });
  }),
);

router.put(
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
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listing/${id}`);
  }),
);

module.exports = router;
