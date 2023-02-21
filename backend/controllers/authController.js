
const User = require("../models/user");
const sendToken = require("../utils/jwtToken")
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');




exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

    // Create new user
    //did not add avator
    const user = await User.create({ name, email, password });

    sendToken(user,200,res)
  
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Please provide email and password" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Generate JWT token
    sendToken(user,200,res)
  }catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//forgot password




exports.forgotPassword = async (req, res, next) => {
  console.log("forgotPassword function called");
  // Get user by email
  const user = await User.findOne({ email: req.body.email });
  // console.log(req.body.email)

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // Generate password reset token and set it in the user object
  const resetToken = user.generatePasswordResetToken();
  await user.save();

  // Send password reset email to user
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
  sendPasswordResetEmail(user.email, resetUrl); // calling the function with user's email and resetUrl

  res.status(200).json({ success: true, message: "Password reset email sent" });
};






//logout user

exports.logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
