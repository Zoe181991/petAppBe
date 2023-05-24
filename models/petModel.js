
const  mongoose = require("mongoose");
const Schema = mongoose.Schema

const Pet = require('./petSchema')
const User = require('./userSchema')


//findPetUsingId - READ
async function findPetById(id) {
    try{
    console.log("Find Pet in DB by id:", id)
    const pet = await Pet.findOne({ _id: id })
    // console.log(pet)
    return pet;
    }
    catch(err){
        console.log(err)
    }
}


//updatePetStatus - Update


async function changeToFosteredStatus(req,res,next){
    try{
        const update = await Pet.findOneAndUpdate({_id: req.params.petId},
        {adoptionStatus: "Fostered"},
        {new: true}
        )
        console.log(update)
        next();
    } catch(err){
        console.log(err)
        res.send(err)
    }
}

async function changeToAvailableStatus(req,res,next){
    console.log( req.params.petId)
    console.log(  req.params.userId)
    try{
        const update = await Pet.findOneAndUpdate({_id: req.params.petId},
        {adoptionStatus: "Available"},
        {new: true}
        )
        console.log(update)
        next();
    } catch(err){
        console.log(err)
        res.send(err)
    }
}


async function changeToAvailableStatusById(petId){
   
    try{
        const update = await Pet.findOneAndUpdate({_id: petId},
        {adoptionStatus: "Available"},
        {new: true}
        )
        console.log(update)
        next();
    } catch(err){
        console.log(err)
        res.send(err)
    }
}





async function changeToAdoptedStatus(req,res,next){
    console.log( req.params.petId)
    console.log(  req.params.userId)
    try{
        const update = await Pet.findOneAndUpdate({_id: req.params.petId},
        {adoptionStatus: "Adopted"},
        {new: true}
        )
        console.log(update)
        next();
    } catch(err){
        console.log(err)
        res.send(err)
    }

}
//addOwnerconsole



async function removeFromFoster(req, res, next) {
    try {
        console.log(req.params.userId)
        console.log(req.params.petId)

        const userAfterUpdate = await User.updateOne
        ({_id: req.params.userId}, 
        { $pull: { fosteredPets : req.params.petId} },
        {new: true})

        console.log(userAfterUpdate)
        next()

    } catch (err) {
        console.log(err)
    }

}

async function addOwner(req,res,next){
    try{
        const filter = { _id: req.params.petId };
        const petAfterUpdate = await Pet.findOneAndUpdate(
            filter,
            { owner: req.params.userId},
            { new: true });
            console.log(petAfterUpdate)
            next();
    } catch(err){
        console.log(err)
        res.send(err)
    }
    
   }

   async function clearOwner(req, res, next){
    console.log( req.params.petId)
    console.log(  req.params.userId)
    try{
        const update = await Pet.findOneAndUpdate({_id: req.params.petId},
        {owner: null},
        {new: true}
        )
        console.log(update)
        next();
    } catch(err){
        console.log(err)
        next(err)
    }
   }

   async function clearOwnerById(petId){
  
    try{
        const update = await Pet.findOneAndUpdate({_id: petId},
        {owner: null},
        {new: true}
        )
        console.log(update)
        return
  
    } catch(err){
        console.log(err)
    }
   }

   async function addPetModel(newPet){
    try{
        console.log(newPet)
        const register = new Pet (newPet)
        await register.save()
        return register;
    } catch(err){
        console.log(err)
    }


   }

   async function deletePetModel(id){
    const confirm = await Pet.findByIdAndDelete(id)
    console.log(confirm)
    return confirm

   }





module.exports = {findPetById, changeToFosteredStatus, addOwner, clearOwner, clearOwnerById, changeToAvailableStatusById,
    changeToAvailableStatus, addPetModel, changeToAdoptedStatus, removeFromFoster, deletePetModel}

