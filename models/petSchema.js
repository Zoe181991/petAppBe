const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  adoptionStatus: {
    type: String,
    enums: ["Available", "Adopted", "Fostered"],
    default: "Avilable",
    required: true,
  },
  picture: {
    type: String,
    min: 0,
  },
  height: {
    type: Number,
    min: 0,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  bio: {
    type: String,
  },
  hypoallergnic: {
    type: Boolean,
    default: false,
  },
  dietery: {
    type: [String],
  },

  breed: {
    type: String,
    required: true,
  },

  date_created: {
    type: Date,
    default: Date.now,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pet", petSchema);
