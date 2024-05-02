const express = require("express");
const router = express.Router();
const MenuItem = require("../model/menu");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched SuccessFully");
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const itemTaste = req.params.taste;
    const response = await MenuItem({ taste: itemTaste });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    console.log("Item Deleted Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuUpdatedData = req.body;
    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      menuUpdatedData
    );
    console.log("Menu Item Updated Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
