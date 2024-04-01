const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pet = require("./petSchema");
const User = require("./userSchema");

async function getPetByType(req, res) {
  try {
    const pets = await Pet.find({ type: req.params.type });
    console.log(pets);
    res.send(pets);
  } catch (err) {
    console.log(err);
  }
}

async function searchPet(req, res) {
  console.log(req.query);
  try {
    const name = req.query.name;
    const weight = req.query.weight;
    const height = req.query.height;
    const type = req.query.type;
    const status = req.query.status;
    let searchQuery = {};
    if (name) {
      searchQuery.name = { $regex: name, $options: "i" };
    }
    if (status) {
      searchQuery.adoptionStatus = status;
    }
    if (type) {
      searchQuery.type = type;
    }
    if (height) {
      searchQuery.height = { $gte: height };
    }
    if (weight) {
      searchQuery.weight = { $gte: weight };
    }

    const pets = await Pet.find(searchQuery);
    if (pets.length === 0) {
      res.status(400).send("Your search doesn't match any pet");
    } else {
      res.send(pets);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPetByType, searchPet };
