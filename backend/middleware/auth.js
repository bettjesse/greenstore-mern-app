const jwt = require('jsonwebtoken');
const User = require('../models/user');




// exports.isAuthenticatedUser = async (req, res, next) => {
//   const { token } = req.cookies;
//   console.log('Token:', token);

//   if (!token) {
//     return res.status(401).json({ success: false, error: 'Unauthorized access. Please login 1st.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded token:', decoded);

//     // Check if the user exists in the database
//     req.user = await User.findById(decoded.id);

//     if (!req.user) {
//       return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid token.' });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid token.' });
//   }
// };





// using token

// exports.isAuthenticatedUser = async (req, res, next) => {
//   if (!req.session.user) {
//     return res.status(401).json({ success: false, error: 'Unauthorized access. Please login 1st.' });
//   }

//   try {
//     // Check if the user exists in the database
//     req.user = await User.findById(req.session.user._id);

//     if (!req.user) {
//       return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid user.' });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ success: false, error: 'Unauthorized access. Invalid user.' });
//   }
// };



// using session
exports.isAuthenticatedUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, error: "Unauthorized access. Please login first." });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized access. Invalid session." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}








//handling user roles 
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, error: 'You are not authorized to perform this action.' });
      }
      next();
    };
  };
  
  