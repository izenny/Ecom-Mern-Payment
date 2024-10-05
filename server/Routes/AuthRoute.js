const AuthController = require("../Controllers/AuthController");

const router = require("express").Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

router.post("/logout", AuthController.logoutUser);
router.get("/checkauth", AuthController.authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
