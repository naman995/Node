const express = require("express");
const router = express.Router();
const Person = require("../model/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body; 
    const newPerson = new Person(data);

    const response = await newPerson.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get(`/`, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched SuccessFully");
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Data Fetched ");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Work Type invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personUpdatedData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      personUpdatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(400).json({ error: "Person not found" });
    }
    console.log("Data Deleted")
    response.status(200).json("Deleted Successfully");
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
