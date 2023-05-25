
const db = require('../db/db')
const { findOne, findById } = require('../models/petSchema')
const { findUserById } = require('../models/userModel')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const {clearOwnerById, changeToAvailableStatusById} = require('../models/petModel')
require('dotenv').config()



async function authAdmin(req, res, next) {
  console.log("auth admin")
  console.log(req.cookies.token)
    if(!req.cookies.token) {
      return res.status(401).send('Token Required')
     }
    const token = req.cookies.token
    const getIdfromToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid Token')
      }
    return decoded.id;
    })
    console.log(getIdfromToken, "userId")
    const isAdmin = await User.findOne({ _id: getIdfromToken })
    console.log(isAdmin.role, "info from db")
    if (isAdmin.role!=="Admin") {
      res.status(401).send('This user is unauthorized')
    }  
    if(isAdmin.role==="Admin"){
      console.log("This user is an admin!")
      return next()
    }
   

  }


  async function removeOwnerFromPets(req, res, next){
    console.log("hi", req.params.id)
    const userToRemove = await findUserById (req.params.id)
    console.log(userToRemove)
    try{
    if(userToRemove.fosteredPets.length>0){
      console.log(userToRemove.fosteredPets)
      for(let i=0; i<userToRemove.fosteredPets.length;i++){
        await clearOwnerById (userToRemove.fosteredPets[i])
        await changeToAvailableStatusById (userToRemove.adoptedPets[i].valueOf())

      }
    }
    if(userToRemove.adoptedPets.length>0){
      console.log(userToRemove.adoptedPets)
      for(let i=0; i<userToRemove.adoptedPets.length;i++){
        console.log(userToRemove.adoptedPets[i].valueOf())
        await clearOwnerById (userToRemove.adoptedPets[i].valueOf())
        await changeToAvailableStatusById (userToRemove.adoptedPets[i].valueOf())
      }
    }
    next()

    } catch(err){
      console.log(err)
      res.status(400).send("process failed")
    }
     
  }

module.exports = { authAdmin, removeOwnerFromPets}

