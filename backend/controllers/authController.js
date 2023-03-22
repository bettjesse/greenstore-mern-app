
const User = require("../models/user");
const sendToken = require("../utils/jwtToken")
const sendPasswordResetEmail = require('../utils/sendPasswordResetEmail');
const crypto= require("crypto")
const jwt = require("jsonwebtoken");


// using jwt

// exports.register = async (req, res, next) => {
//   const { name, email, password } = req.body;

//     // Create new user
//     //did not add avator
//     const user = await User.create({ name,
//       email,
//        password 
//       });
//       sendToken(user,200,res)
  
// }

// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if email and password are provided
//   if (!email || !password) {
//     return res.status(400).json({ success: false, error: "Please provide email and password" });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email }).select("+password");

//     // Check if user exists
//     if (!user) {
//       return res.status(401).json({ success: false, error: "Invalid credentials" });
//     }

//     // Check if password matches
//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: "Invalid credentials" });
//     }



//     // Set token as a cookie
//     sendToken(user,200,res)

//   }catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };




// using session
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Create new user
    //did not add avator
    const user = await User.create({ name, email, password });

    // Set user ID in session
    req.session.userId = user._id;

    res.status(200).json({ success: true, message: "Registration successful",user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
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

    // Set user ID in session
    req.session.userId = user._id;

    res.status(200).json({ success: true, message: "Login successful",user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}



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


// reset password => /api/v1/passord/reset
exports.resetPassword = async (req, res, next) => {
const resetPasswordToken=  crypto.createHash("sha265").update(req.params.token).digest("hex")
const user= await User.findOne({
  resetPasswordToken,
  resetPasswordExpire: {$gt: Date.now()}
})
if (!user) {
  return next("password  reset token is invalid or has expired ",400)
}
if (req.body.password!== req.body.confirmPassword,400){
  return next("password does not match")
}
// set new password 
user.password = req.body.password
user.resetPasswordToken = undefined
user.resetPasswordExpire= undefined
await user.save()


}

// get currently logged in user details
exports.getUserProfile= async(req,res,next)=>{
  console.log('Headers:', req.headers);
const user= await User.findById(req.user.id)
res.status(200).json({
  success: true,
  user,
}) 
}

 


//logout user

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

