// require('dotenv').config();
// const sendToken = (user, statusCode, res) => {
//     // Create JWT token
//     const token = user.getJwtToken();
  
//     // Set cookie options
// const cookieOptions = {
//       expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//       httpOnly: true,
//     };
  
//     // Set cookie
//     res.cookie('token', token, cookieOptions);
  
//     // Send response
//     res.status(statusCode).json({
//       success: true,
//       token,
//       user,
//     });
//   };

const sendToken = (user, statusCode, res) => {
    // Generate JWT token
    const token = user.getJwtToken();
  
    // Set cookie options
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    const cookieOptions = {
      expires,
      httpOnly: true,
    };
  
    // Set cookie
    res.cookie("token", token, cookieOptions);
  
    // Send response with success and token
    res.status(statusCode).json({ success: true, token });
  };
  


  
module.exports= sendToken