const jwt = require('jsonwebtoken');
const User = require('../models/user');



exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized access. Please provide a valid token.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the database
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid token.' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid token.' });
  }
};







// using token



    // check the user existence
 


// using session






//handling user roles 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, error: 'You are not authorized to perform this action.' });
      }
      next();
    };
  };
  
  