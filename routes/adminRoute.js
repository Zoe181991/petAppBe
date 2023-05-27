const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
const PetsController = require('../controllers/PetsController')
const AdminController = require('../controllers/AdminController')
const UserController = require('../controllers/UserController')
const { authAdmin, removeOwnerFromPets} = require('../middleware/adminMiddleware')

const {upload } = require('../middleware/imagesMiddleware')
const multer = require('multer');

//authAdmin was removed until I fiz the cookie bug
// router.get('/', (req,res)=>{res.send("Admin Route!")})

//Admin functionalities
router.post('/updatepetinfo',  AdminController.updatePetsInfo);


router.post('/updatepetwithimage',  upload.single('picture'), AdminController.updatePetsInfoImage)
router.post('/addpet',  upload.single('picture'), AdminController.addPet )


router.delete('/deletepet/:id',  AdminController.deletePet)
router.delete('/deleteuser/:id',  removeOwnerFromPets, AdminController.deleteUser)

router.put('/updateuserinfo/turnintoadmin/:id',  AdminController.updateUserToAdmin)
router.put('/updateuserinfo/turnintouser/:id',   AdminController.updateAdminToUser)


router.get('/:id',  UserController.getUserByIdParams );




module.exports = router;




