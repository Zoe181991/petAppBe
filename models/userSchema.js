const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
  },
  password: {
    type: String,
    min: 6,
    max: 12,
    required: true,
  },

  date_created: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
    default: "",
  },

  picture: {
    type: String,
  },

  role: {
    type: String,
    enums: ["User", "Admin"],
    default: "User",
    required: true,
  },

  savedPets: {
    type: [Schema.Types.ObjectId],
    ref: "Pet",
  },
  adoptedPets: {
    type: [Schema.Types.ObjectId],
    ref: "Pet",
  },
  fosteredPets: {
    type: [Schema.Types.ObjectId],
    ref: "Pet",
  },
});

module.exports = mongoose.model("User", userSchema);
