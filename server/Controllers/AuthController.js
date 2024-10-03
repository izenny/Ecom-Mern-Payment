const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Modals/UserSchema");

//register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
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
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "some error occured",
      error,
    });
  }
};

//logout
