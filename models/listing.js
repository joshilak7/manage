const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      filename: String,
      url: {
        type: String,
        default:
          "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    },
    price: Number,
    location: String,
    country: String,
  },
  { timestamps: true }
);

const List = mongoose.model("List", listingSchema);
module.exports = List;
