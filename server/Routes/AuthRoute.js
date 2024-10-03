const AuthController = require("../Controllers/AuthController");

const router = require("express").Router();

router.post("/register", AuthController.registerUser);





module.exports = router;
