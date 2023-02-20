
const User = require("../models/user");
const sendToken = require("../utils/jwtToken")

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

//logout user


exports.logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};
