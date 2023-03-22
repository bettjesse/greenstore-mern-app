

const sendToken = (user, statusCode, res) => {
    // Generate JWT token
    const token = user.getJwtToken();
  
    // Set cookie options
    
    const cookieOptions = {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    
      httpOnly: false,
      // sameSite: 'none'

    };
    
  
    
  
    // Send response with success and token
    res.status(statusCode).cookie(" token", token, cookieOptions).json({
      success: true,
      token,
      user
    });
  };
  



module.exports = sendToken;


