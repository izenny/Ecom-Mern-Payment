

const { handleImageUpload } = require("../../Controllers/AdminControllers/ProductsController");
const { upload } = require("../../Helpers/Cloudinary");

const router = require("express").Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);





module.exports = router;
