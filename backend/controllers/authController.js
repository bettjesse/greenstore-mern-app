
const User = require("../models/user");
const sendToken = require("../utils/jwtToken")
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');
const crypto= require("crypto")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



  


exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

    // Create new user
    //did not add avator
    const user = await User.create({ name,
      email,
       password 
      });
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
    const token = user.getJwtToken();

    // Send response with success and token
    res.status(200).json({
      success: true,
      token: `Bearer ${token}`, // Add "Bearer" prefix to the token
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};







// exports.forgotPassword = async (req, res, next) => {
//   console.log("forgotPassword function called");
//   // Get user by email
//   const user = await User.findOne({ email: req.body.email });
//   // console.log(req.body.email)

//   if (!user) {
//     return res.status(404).json({ success: false, error: "User not found" });
//   }

//   // Generate password reset token and set it in the user object
//   const resetToken = user.generatePasswordResetToken();
//   await user.save();

//   // Send password reset email to user
//   const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;
//   sendPasswordResetEmail(user.email, resetUrl); // calling the function with user's email and resetUrl

//   res.status(200).json({ success: true, message: "Password reset email sent" });
// };


// // reset password => /api/v1/passord/reset
// exports.resetPassword = async (req, res, next) => {
// const resetPasswordToken=  crypto.createHash("sha265").update(req.params.token).digest("hex")
// const user= await User.findOne({
//   resetPasswordToken,
//   resetPasswordExpire: {$gt: Date.now()}
// })
// if (!user) {
//   return next("password  reset token is invalid or has expired ",400)
// }
// if (req.body.password!== req.body.confirmPassword,400){
//   return next("password does not match")
// }
// // set new password 
// user.password = req.body.password
// user.resetPasswordToken = undefined
// user.resetPasswordExpire= undefined
// await user.save()


// }

// get currently logged in user details
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

  

 


// //logout user

exports.logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

exports.getAllUsers= async(req,res,next)=>{
 const users= await User.find()

 res.status(200).json({
  success: true,
  users
 })
}
 
exports.getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

