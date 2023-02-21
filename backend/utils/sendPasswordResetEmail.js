const nodemailer = require("nodemailer");

const sendPasswordResetEmail = (toEmail) => {
  console.log("forgotPassword function called");

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD 
    }
  });

  const message = {
    
    from: process.env.SMTP_EMAIL,
    to: toEmail,
    subject: "Password Reset Request",
    html: "<p>Please click the link below to reset your password:</p><a href='reset-password-link'>Reset Password</a>",
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = sendPasswordResetEmail;
