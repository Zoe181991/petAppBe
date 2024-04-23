const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userSchema");
const Pet = require("./petSchema");

async function tableResults(req, res) {
  try {
    const sumResults = await Pet.find();
    const result = await Pet.find()
      .sort({ name: 1 })
      .skip(req.query.page > 0 ? (req.query.page - 1) * req.query.limit : 0)
      .limit(req.query.limit);
    res.status(200).send(result);
  } catch (err) {
    res.send(err.message);
  }
}

async function tableResultsUsers(req, res) {
  try {
    const sumResults = await User.find();
    const result = await User.find()
      .sort({ name: 1 })
      .skip(req.query.page > 0 ? (req.query.page - 1) * req.query.limit : 0)
      .limit(req.query.limit);
    res.status(200).send(result);
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = { tableResults, tableResultsUsers };
