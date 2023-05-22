
const bcrypt = require('bcrypt');
const db = require('../db/db')
const User = require('../models/userSchema')
const { findUserByEmail } = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function isUserNew(req, res, next) {
    console.log("is user new?")
    const isUserNew = await findUserByEmail(req.body.email)
    // await User.find({email:req.body.email})
    // const user = await findUserByEmail(email)

    console.log(typeof isUserNew, "res from db")
    if (!isUserNew) {
        console.log("user is new, continue to registration")
        return next()
    } else {
        res.status(400).send('User already exists')
    }
}



async function passwordMatch(req, res, next) {
    if (req.body.password === req.body.repassword) {
        console.log("password match")
        return next()
    }
    res.status(400).send('Passwords dont match')
}

async function encryptPassword(req, res, next) {
    const saltRounds = 10
    console.log(req.body.password + "got this password")
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send(err.message)
        } else {
            console.log(hash)
            req.body.password = hash
            next()
        }
    });

}

function auth(req, res, next) {
    if(!req.cookies.token) {
      return res.status(401).send('Token Required')
     }
     const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid Token')
      }
      req.body.userId = decoded.id
      next()
    })
  
  
  }








module.exports = { passwordMatch, isUserNew, encryptPassword, auth }

