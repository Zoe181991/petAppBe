
const  mongoose = require("mongoose");
const Schema = mongoose.Schema
const User = require("./userSchema")

//createUser - CREATE
async function createNewUserInDB(newUser) {
    try{
    console.log("create user func")
    const register = new User (newUser)
    await register.save()
    console.log("New user in createDB:" + register)
    return register;

    }
    catch(err){
        console.log(err)
    }   
}




//finduserByEmail - READ
async function findUserByEmail(email) {
    try{
    const emailLowerCase = email.toLowerCase();
    console.log(emailLowerCase)
    const user = await User.findOne({ email: emailLowerCase })
    console.log("user was found in db", user)
    return user;
    }
    catch(err){
        console.log("1234567")
    }
}


//finduserById - READ
async function findUserById(id) {
    try{
    console.log(id, typeof id, "MODAL find user by id function")
    const user = await User.findOne({ _id: id })
    return user;
    }
    catch(err){
        console.log(err)
    }
}


async function deleteUserModel(id){
    const confirm = await User.findByIdAndDelete(id)
    console.log(confirm)
    return confirm

   }





module.exports = { createNewUserInDB, findUserByEmail, findUserById, deleteUserModel, }
