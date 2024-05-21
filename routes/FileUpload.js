const express = require("express");
const router = express.Router();

// Import handler functions from the fileUpload controller
const {imageUpload ,  localFileUpload , videoUpload , imageSizeReducer}  = require("../controllers/fileUpload");

// API routes 
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload" , imageUpload);
router.post("/videoUpload" , videoUpload);
router.post("/imageSizeReducer" , imageSizeReducer);

//Exporting the modules 
module.exports = router;
