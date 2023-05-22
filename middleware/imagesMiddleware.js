const multer = require('multer')
const path = require('path')

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configuration 
cloudinary.config({
  cloud_name: "dwhknzktx",
  api_key: "495853576268587",
  api_secret: "xPHxh0PVL6q4_zEGfD1J6NboIs8"
});



const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: cloudStorage });

module.exports = {upload}







// const multer = require('multer')
// const path = require('path');

// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // const pathToImages = path.resolve(__dirname, '../userImages');

// // Configuration 
// cloudinary.config({
//     cloud_name: "dwhknzktx",
//     api_key: "495853576268587",
//     api_secret: "xPHxh0PVL6q4_zEGfD1J6NboIs8"
//   });


//   const cloudStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     },
//   });

  
//   const upload = multer({ storage: cloudStorage });

//   module.exports = { upload };

  // const upload = multer({ storage: storage });
  
// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });



  
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, pathToImages);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage: storage });


// function createImageUrl(req,res,next){
//     const imageUrl = `http://localhost:8080/${req.file.filename}`
//     console.log(req.file)
//     console.log(imageUrl)
//     next()
// }

// const storage = new CloudinaryStorage(
//   {
//   cloudinary: cloudinary,
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

  

