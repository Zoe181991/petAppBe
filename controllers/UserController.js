const express = require('express')
const { mongo, default: mongoose } = require('mongoose')
const User = require('../models/userSchema')
const db = require('../db/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser');
const { createNewUserInDB, findUserByEmail, findUserById} = require('../models/userModel')
const {encryptPassword} = require('../middleware/validateUserInfo')
const app = express()

require('dotenv').config()



async function SignUp(req, res) {
    try {
        const { first_name, last_name, email, password, phone_number } = req.body
        const newUser = await createNewUserInDB({
            first_name,
            last_name,
            email,
            phone_number,
            password
        })
        res.status(201).send(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

async function Login(req, res, next) {
    console.log(req.body, "login request from user")
    try {
        const { email, password } = req.body
        const user = await findUserByEmail(email.toLowerCase())
        if (user === null) {
            console.log("Check email")
            return res.status(500).send("This email doesn't match a registered user")
        }
        const verifyUser = await bcrypt.compare(password, user.password)
        if (!verifyUser) {
            const err = new Error('Incorrect Password!')
            err.statusCode=400
            err.statusMessage='Incorrect Password!'
            return next(err)
            
            // return res.status(400).statusMessage('Incorrect Password!').send()
        }
        if (verifyUser) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.cookie('token', token, { 
                maxAge: 100000 * 20 * 60, 
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production" ? true : false,
        
            })
            res.send({ ok: true, id: user._id})
          }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send(err.messege)
    }
}




async function updatePassword(req, res) {
    try{
        console.log("user is trying to update password")
        console.log(req.body.password)
        const userId = req.params.id;
        console.log(userId)
        // const hashedPassword = await encryptPassword(password)
        // console.log(hashedPassword)
        const filter = { _id: userId };
        const update = {password: req.body.password};
        const userAfterUpdate = await User.findOneAndUpdate(filter, update, {
            new: true
        });
        console.log(userAfterUpdate)
        res.status(200).send(userAfterUpdate)
    
        } catch(err){
            res.status(400).send(err)
        }


}





async function updateUserById(req, res) {

    try{
    console.log("update user id")
    console.log(req.body.id)
    console.log(req.file.path)

    const filter = { _id: req.body.id };
    const update = {...req.body, picture:req.file.path };
  
    const userAfterUpdate = await User.findOneAndUpdate(filter, update, {
        new: true
    });
    console.log(userAfterUpdate)
    res.status(200).send(userAfterUpdate)

    } catch(err){
        res.status(400).send(err)

    }
    
}


async function updateUserInfo(req, res) {
    try{
    console.log("update user id")
    console.log(req.body)
    const userAfterUpdate = await User.findOneAndUpdate({ _id: req.body.id }, req.body, {
        new: true
    });
    console.log(userAfterUpdate)
    res.status(200).send(userAfterUpdate)

    } catch(err){
        res.status(400).send(err)
    }  
}

function deleteUserById(req, res) {
    const userId = req.params.id;
    res.send(`This is gg a route to delete user with ID: ${userId}`);
}

async function getUserByIdParams(req, res) {
    const userId = req.params.id;
    const filter = { _id: userId };
    const userInfo = await User.findOne(filter);
    console.log(userInfo)
    res.send(userInfo);

}

async function getAllUsers(req, res) {

    try {
        console.log("Getting all users")
        const result = await User.find()
        res.send(result);
    }
    catch (err) {
        res.send(err.messege)
    }
}

async function getUserInfo(req, res) {
    const userId=  req.body.id;
    console.log(userId)
    const filter = { _id: userId };
    const userInfo = await User.findOne(filter);
    res.send(userInfo);
}

async function getSavedPets(req, res) {
    const userId=  req.params.id;
    console.log(userId)
    const filter = { _id: userId };
    const getSavedPets = await User.findOne(filter).populate('savedPets').exec()
    res.send(getSavedPets.savedPets);
}

async function getAdoptedPets(req, res) {
    const userId=  req.params.id;
    console.log(userId)
    const filter = { _id: userId };
    const getAdoptedPets = await User.findOne(filter).populate('adoptedPets').exec()
    res.send(getAdoptedPets.adoptedPets);
}

async function getFosteredPets(req, res) {
    const userId=  req.params.id;
    console.log(userId)
    const filter = { _id: userId };
    const getFosteredPets = await User.findOne(filter).populate('fosteredPets').exec()
    res.send(getFosteredPets.fosteredPets);
}

async function Logout(req,res){
    try{
        console.log(req.cookies)
        res.clearCookie('token');
        res.clearCookie('token', { 
            domain: process.env.NODE_ENV === "production" && 'https://pet-app-fe.vercel.app', 
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
    
        });

        res.setHeader('Set-Cookie', "");
        res.setHeader('Cookie', "");
        res.status(200).send("cookie was cleard")

    } catch (err){
        res.status(500).send(err)
    }
  

}




module.exports = { Logout, Login, SignUp, getUserInfo, updateUserById, deleteUserById, 
    updatePassword, getUserByIdParams, getAllUsers, getSavedPets, updateUserInfo,
    getAdoptedPets, getFosteredPets }