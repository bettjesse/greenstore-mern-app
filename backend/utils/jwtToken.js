const sendToken = (user, statusCode, res) => {
  // Generate JWT token
  const token = user.getJwtToken();

console.log('Generated token:', token);


  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
   
    sameSite: 'none',
   
  };

  // Set the token as a cookie
  res.cookie('token', token, cookieOptions);

  // Send response with success and token
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
