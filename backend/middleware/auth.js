const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized access. Please login first.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user exists in the database
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'Unauthorized access. Please login first.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized access. Please login first.' });
  }
};

//handling user roles 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, error: 'You are not authorized to perform this action.' });
      }
      next();
    };
  };
  
  