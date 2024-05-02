const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleDateString()}] Request made to : ${req.originUrl}`
  );
};

app.get("/", logRequest, (req, res) => {
  res.send("Welcome to our hotel");
});

// Import Router Files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Use the routes
app.use("/person", personRoutes);
app.use("/menuItems", menuRoutes);

app.listen(3000);
