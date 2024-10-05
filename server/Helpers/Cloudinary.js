const cloudinary = require("cloudinary").v2;
const multer = require('multer')

require('dotenv').config(); // Load environment variables

cloudinary.config({
  cloud_name: process.env.Cloud_Name,  // Ensure the key names match exactly
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

const storage = new multer.memoryStorage();

exports.imageUploadCloudinary = async (file)=>{
const result = await cloudinary.uploader.upload(file,{
    resource_type:'auto'
})
return result
}

exports.upload = multer({storage});
