//Importing the cloudinary library
const cloudinary = require("cloudinary").v2;

//Making a cloudinaryConnect function and  using a cloudinary.config() Method we can establish the connection

//Three things we need to define in the config method

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        })
    }
    catch(error){
        console.log(error);
    }
}

