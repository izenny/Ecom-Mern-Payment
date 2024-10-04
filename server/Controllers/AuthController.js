const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Modals/UserSchema");

//register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password in the 'password' field
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
      error,
    });
  }
};

//login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({ message: "User Doesn't Exists", success: false });
    }
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({ message: "Incorrect Password", success: false });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        username: checkUser.username,
        role: checkUser.role,
      },
      process.env.JWTkey,
      {
        expiresIn: "2h",
      }
    );
    const cookieOption = {
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict", // Mitigate CSRF attacks
    };
    res.cookie("token", token, cookieOption).json({
      message: "Login successfull",
      success: true,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occured",
      error,
    });
  }
};

//logout
exports.logoutUser = async (req, res) => {
  try {
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
    res
      .cleaCookie("token", cookieOption)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occured",
      error,
    });
  }
};

//auth middleware

exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWTKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occured",
      error,
    });
  }
};
