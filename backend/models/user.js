const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
