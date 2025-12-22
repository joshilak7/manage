const Joi = require("joi");

const listingSchema = Joi.object({
  List: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    img: Joi.string().allow("", null),
    country: Joi.string().required(),
  }).required(),
});
module.exports = listingSchema;

const reviewSchema = Joi.object({
  Re: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
