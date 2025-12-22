const { Schema } = require("mongoose");
const mongoose = require("mongoose");

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

let re = mongoose.model("Re", liss);
module.exports = re;
