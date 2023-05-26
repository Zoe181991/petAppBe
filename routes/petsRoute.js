const express = require('express')
const router = express.Router()
const Pet = require('../models/petSchema')
const mongoose = require('mongoose');
const db = require('../db/db')
const PetsController = require('../controllers/PetsController')
const { auth} = require('../middleware/validateUserInfo')
const { authAdmin} = require('../middleware/adminMiddleware')
const { addOwner, clearOwner,
    changeToFosteredStatus, changeToAvailableStatus, changeToAdoptedStatus,
    removeFromFoster, getAdoptedPets } = require('../models/petModel')
const {  getPetByType} = require('../models/SearchPetModal')
const {upload } = require('../middleware/imagesMiddleware')
const multer = require('multer');


//Get Pets info (list and single)
router.get('/', PetsController.getAllPets )

router.get('/adopted', PetsController.getAllAdoptedPets )
router.get('/available', PetsController.getAllAvailablePets )

router.get('/:id',  PetsController.getPetByIdParams )

//Search
router.get('/search/:type', getPetByType)




//User functionalities (SavePet, FosterPet and AdoptPet and remove)
router.post('/save',  PetsController.savePetToUser )
router.delete('/:petId/removesaved/:userId',  PetsController.removeSavedPet )

router.put('/:petId/foster/:userId', changeToFosteredStatus, addOwner, PetsController.fosterPetUser)
router.delete('/:petId/removefoster/:userId',  clearOwner, changeToAvailableStatus,  PetsController.removeFosteredPet )

router.put('/:petId/adopt/:userId', changeToAdoptedStatus, addOwner, removeFromFoster, PetsController.adoptPetUser)
router.delete('/:petId/removeadopt/:userId',  clearOwner, changeToAvailableStatus, PetsController.removeAdoptededPet )




module.exports = router;




