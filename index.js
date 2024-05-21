const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
require("dotenv").config();

//Taking out the Port No from the env file which is loaded in the process folder
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));

// Database connection
const db = require("./config/database");
db.connect();

// Cloudinary setup
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Routes
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// Start server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});









