const express = require("express");
const mongo = require("../models/listing.js");
const List = require("../models/listing.js");
const Review = require("../models/re.js");
const wrap = require("../uii/wrap.js");
const Express = require("../uii/express.js");
const { reviewSchema } = require("../uii/joy.js");
const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  console.log("Received review data:", req.body);
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log("Joi error:", error.details);
    const msg = error.details.map((el) => el.message).join(",");
    throw new Express(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  wrap(async (req, res) => {
    const listing = await List.findById(req.params.id);
    const review = new Review(req.body.review);
    console.log("Creating review:", review);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success", "Review Added Successfully");
    res.redirect(`/listing/${listing._id}`);
  }),
);

router.delete(
  "/:reviewId",
  wrap(async (req, res) => {
    const { id, reviewId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listing/${id}`);
  }),
);

module.exports = router;
