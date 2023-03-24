const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be at least 6 characters"],
    select: false, // to not return the password in response
  },
  role: {
    type: String,
    default: "user",
  },
 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// encrypt password before saving user
userSchema.pre("save", async function (next) {
  // check if password is modified, otherwise, skip this middleware
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.comparePassword = async function (inputPassword) {
  try {
    // Compare the input password with the stored hashed password
    return await bcrypt.compare(inputPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};


// method to get a JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 365 * 24 * 60 * 60 // expires in 1 year
  });
};


//generate password reset token





// ...

userSchema.methods.generatePasswordResetToken = function () {
  // Generate a unique reset token using crypto
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Set the reset token and expiry date in the user object
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};



const User = mongoose.model("User", userSchema);

module.exports = User;