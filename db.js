const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = "mongodb://localhost:27017/hotels";
// const mongoURL = process.env.MONGO_DBURL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", function () {
  console.log("Connected to MongoDB");
});

db.on("error", function (error) {
  console.error("Error connecting to MongoDB:", error);
});

db.on("disconnected", function () {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
