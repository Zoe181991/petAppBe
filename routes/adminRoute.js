const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
const PetsController = require('../controllers/PetsController')
const AdminController = require('../controllers/AdminController')
const UserController = require('../controllers/UserController')
const { authAdmin, removeOwnerFromPets} = require('../middleware/adminMiddleware')

const {upload } = require('../middleware/imagesMiddleware')
const multer = require('multer');


// router.get('/', (req,res)=>{res.send("Admin Route!")})

//Admin functionalities
router.post('/updatepetinfo', authAdmin, AdminController.updatePetsInfo);


router.post('/updatepetwithimage', authAdmin, upload.single('picture'), AdminController.updatePetsInfoImage)
router.post('/addpet',  authAdmin, upload.single('picture'), AdminController.addPet )


router.delete('/deletepet/:id', authAdmin, AdminController.deletePet)
router.delete('/deleteuser/:id', authAdmin, removeOwnerFromPets, AdminController.deleteUser)

router.put('/updateuserinfo/turnintoadmin/:id', authAdmin, AdminController.updateUserToAdmin)
router.put('/updateuserinfo/turnintouser/:id', authAdmin, AdminController.updateAdminToUser)


router.get('/:id', authAdmin, UserController.getUserByIdParams );




module.exports = router;




