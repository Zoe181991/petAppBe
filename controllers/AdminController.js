const express = require('express')
const { mongo, default: mongoose } = require('mongoose')
const db = require('../db/db')
const Pet = require('../models/petSchema')
const User = require('../models/userSchema')

const { deleteUserModel } = require('../models/userModel')
const { deletePetModel } = require('../models/petModel')

const app = express()

require('dotenv').config()




async function deletePet (req,res){
    try{
        const confirm = await deletePetModel(req.params.id)
        if(confirm){
            res.status(200).send(`The pet ${confirm.name} with has been deleted`)
        }    

    } catch (err){
        console.log(err)
        res.status(500).send(err)

    }   
}


async function deleteUser (req,res){
    try{
        const confirm = await deleteUserModel(req.params.id)
            res.status(200).send(`The user ${confirm.first_name} ${confirm.last_name} with has been deleted`)
            
    } catch (err){
        console.log(err)
        res.status(500).send(err)

    }   
}
async function updateUserToAdmin (req,res){
    try{
        console.log(req.params.id)
        const userAfterUpdate = await User.findOneAndUpdate
        ({_id: req.params.id}, 
        { role : "Admin"},
        {new: true})
        console.log(userAfterUpdate)
        res.status(200).send(userAfterUpdate)        
            
    } catch (err){
        console.log(err)
        res.status(500).send(err)

    }   
}


async function updateAdminToUser (req,res){
    try{
        console.log(req.params.id)
        const userAfterUpdate = await User.findOneAndUpdate
        ({_id: req.params.id}, 
        { role : "User"},
        {new: true})
        console.log(userAfterUpdate)
        res.status(200).send(userAfterUpdate)        
            
    } catch (err){
        console.log(err)
        res.status(500).send(err)

    }   
}


//Admin functions
async function updatePetsInfoImage(req,res) {
    try{
        console.log("update pet by id")
        // console.log(req.body)
        // console.log(req.file.path)

        const filter = { _id: req.body.id }
        const updatedPet = {...req.body, picture: req.file.path,}

        const petAfterUpdate = await Pet.findOneAndUpdate(filter, updatedPet, {
            new: true
        });

        if(petAfterUpdate){
            console.log("This Pet has been succsesfully updated", petAfterUpdate)
            res.status(200).send(petAfterUpdate)
        }
    
        } catch(err){
            res.status(400).send(err)
        }  

}

async function updatePetsInfo(req, res) {
    try{
    console.log("update pet without image")
    console.log(req.body)
    const petAfterUpdate = await Pet.findOneAndUpdate({ _id: req.body.id }, req.body, {
        new: true
    });
    console.log(petAfterUpdate)
    res.status(200).send(petAfterUpdate)

    } catch(err){
        res.status(400).send(err)
    }  
}

async function addPet(req, res) {
    try {
        console.log(req.file.path)
        const newPet = {...req.body, picture: req.file.path}
        const register = petModel.addPet(newPet)
        if(register){
        console.log("This Pet has been succsesfully registered", register)
        res.status(201).send(register);
        }     
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}


module.exports = {  deletePet, updatePetsInfo, updateAdminToUser, updatePetsInfoImage, addPet, deleteUser, updateUserToAdmin   }
