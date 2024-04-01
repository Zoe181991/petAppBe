const bcrypt = require("bcrypt");
const db = require("../db/db");
const User = require("../models/userSchema");
const { findUserByEmail } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function isUserNew(req, res, next) {
  console.log("is user new?");
  const isUserNew = await findUserByEmail(req.body.email);
  if (!isUserNew) {
    return next();
  } else {
    res.status(400).send("User already exists");
  }
}

async function passwordMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    return next();
  }
  res.status(400).send("Passwords dont match");
}

async function encryptPassword(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log(hash);
      req.body.password = hash;
      next();
    }
  });
}

function auth(req, res, next) {
  if (!req.cookies.token) {
    return res.status(401).send("Token Required");
  }
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }
    req.body.userId = decoded.id;
    next();
  });
}

module.exports = { passwordMatch, isUserNew, encryptPassword, auth };
