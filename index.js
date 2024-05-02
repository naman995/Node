const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const personRoutes = require("./routes/PersonRoutes");
const menuRoutes = require("./routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menuItems", menuRoutes);

app.listen(3000);
