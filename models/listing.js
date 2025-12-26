const mongoose = require("mongoose");
const Review = require("./re");

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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Re",
      },
    ],
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const List = mongoose.model("List", listingSchema);
module.exports = List;
