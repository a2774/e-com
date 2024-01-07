// const multer = require('multer');

// // Define the storage configuration for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Specify the destination directory for uploads
//     cb(null, './uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Specify the filename for the uploaded file
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// // Create the multer upload object using the storage configuration
// const uploads = multer({ storage: storage });

// // Export the storage and uploads objects
// module.exports = { storage, uploads };




const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploads = multer({ storage: storage });

module.exports = uploads;

