const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/manag");
}

main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.error("connection noo:", err);
  });

const init = async () => {
  await listing.deleteMany({});
  await listing.insertMany(initdata.data);
  console.log("Data was savedd");
};

init();
