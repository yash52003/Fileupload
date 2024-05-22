const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req , res) => {

    try{

        //Fetch the file from the request 
        const file = req.files.file;
        console.log("FILE AAGYi JEE -> " , file);

        //create path where the file needs to be stored on the server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path -> " , path);

        //Add path to the move function 
        file.mv(path , (error) => {
            console.log(error);
        });

        //Create the successful response
        res.json({
            success : true,
            message : "Local File Uploaded Successfully",
        })

    }catch(error){
        console.log(error);
    }

};

function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file , folder , quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto",
    console.log("temp File Path" , file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

exports.imageUpload = async (req , res) => {

    try{
        //Step1 - Fetch the data from the image
        const {name , tags , email} = req.body;
        console.log(name , tags , email);

        const file = req.files.imageFile;
        console.log(file);

        //Step2 - validation of the data 
        const supportedTypes = ['jpg', 'jpeg' , 'png'];
        const fileType = file.name.split('.')[1];

        //We need to cheak wheather we have a valid fille type of not --> includes function

        if(!isFileTypeSupported(fileType , supportedTypes)){
            //if the file type is not supported then we will simply return the response

            return res.status(400).json({
                success : false,
                message : "File format not supported",
            })

        }

        //Uploading the file on the cloudinary
        const response  = await uploadFileToCloudinary(file , 'Codehelp');
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        //After the successful upload on the cloudinary 
        res.json({
            success:true,
            message: "Image Successfully Uploaded",
        })

        //Saving the entry in the db 
        // const fileData = await File.create({
        //     name,
        //     tags,
        //     email,
        //     imageUrl,
        // })
    }catch(error){

        console.error(error);
        res.status(400).json({
            success : false,
            message : "Something went wrong",
        });

    }

}

exports.videoUpload = async (req , res) => {
    try{
        //fetch the data from the req
         const {name , email , tags} = req.body;
         console.log(name , email , tags);

        const file = req.files.videoFile;
        console.log(file);

        //Step2 - validation of the data 
        const supportedTypes = ['mp4', 'mov'];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: " , fileType);

        //We need to cheak wheather we have a valid fille type of not --> includes function

        //TODO : Add a upper limit of 5 mb for the video add the codition in the if statement 
        if(!isFileTypeSupported(fileType , supportedTypes)){
            //if the file type is not supported then we will simply return the response

            return res.status(400).json({
                success : false,
                message : "File format not supported",
            })

        }

        //Uploading the file on the cloudinary
        const response  = await uploadFileToCloudinary(file , 'Codehelp');
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        });

        //After the successful upload on the cloudinary 
        res.json({
            success:true,
            message: "video Successfully Uploaded",
        })

    }catch(error){

        console.error(error);
        res.status(400).json({
            success : false,
            message : "Something Went Wrong",
        })

    }
}

exports.imageSizeReducer = async (req , res) => {
    try{

         //Step1 - Fetch the data from the image
         const {name , tags , email} = req.body;
         console.log(name , tags , email);
 
         const file = req.files.imageFile;
         console.log(file);
 
         //Step2 - validation of the data 
         const supportedTypes = ['jpg', 'jpeg' , 'png'];
         const fileType = file.name.split('.')[1];
 
         //We need to cheak wheather we have a valid fille type of not --> includes function
         
         //We can add the limitation on the file size but here we need to compress and upload 
         if(!isFileTypeSupported(fileType , supportedTypes)){
             //if the file type is not supported then we will simply return the response
 
             return res.status(400).json({
                 success : false,
                 message : "File format not supported",
             })
 
         }
 
         //Uploading the file on the cloudinary
         const response  = await uploadFileToCloudinary(file , 'Codehelp', 30);
         console.log(response);
 
         const fileData = await File.create({
             name,
             tags,
             email,
             imageUrl: response.secure_url,
         });
 
         //After the successful upload on the cloudinary 
         res.json({
             success:true,
             message: "Image Successfully Uploaded",
         })
 

    }catch(error){

        console.error(error);
        res.status(400).json({
            success : false,
            message : "Something Went Wrong",
        })

    }
}