const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const { create } = require("./listing");

const liss = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Re = mongoose.model("Re", liss);
module.exports = Re;
