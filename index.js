const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./Auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleDateString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(passport.initialize());
const localMiddleWareAuth = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});

// Import Router Files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Use the routes
app.use("/person", personRoutes);
app.use("/menuItems", menuRoutes);

app.listen(PORT);
