const Joi = require("joi");

// Listing validation schema
const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  img: Joi.string().allow("").optional(), // image URL optional
}).required();

// Review validation schema
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
  }).required(),
});

// Export BOTH schemas as an object
module.exports = { listingSchema, reviewSchema };
