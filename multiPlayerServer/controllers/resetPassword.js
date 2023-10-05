
const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../model/User');

require('dotenv').config();

const app = express();
app.use(express.json());

// Dummy user data (you would fetch this from your database)
const users = [
  { id: 1, email: 'user@example.com', password: 'userpassword' },
  // Add more users as needed
];

// Store the generated OTPs temporarily (you may use a database in a real application)
const otpStore = {};


// Route to send OTP to user's email
const sendOtp = async (req, res) => {
  const user =await User.findOne({userName:req.body.userName})
  if(!user)
     return res.status(201).json({error:"User Not Found"})
  // if(user.email!== req.body.email)
  //     return res.status(201).json({error:"This email is not asssociated with your account"})
  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[user.email] = otp;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({    
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(201).json({ error: 'Failed to send OTP, Either valid email is not registered.' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'OTP sent successfully' });
    }
  });
};

// Route to reset password using OTP
const otpVerification = async (req, res) => {
  const user =await User.findOne({userName:req.body.userName})

   const { otp } = req.body;
   const email = user.email;

  if (otp !== otpStore[email]) {
    return res.status(201).json({ error: 'Invalid OTP' });
  }else{
    return res.status(200).json({message:"OTP succesfully verified"})
  }

}

const resetPassword =async (req,res)=>{
  try{
    const user =await User.findOne({userName:req.body.userName})
    const email = user.email;

   const updatedUserPassword = await User.findOneAndUpdate({userName:req.body.userName},{
    password:req.body.newPassword,
   },{new:true})
  // Remove the OTP from the store as it is no longer needed
  delete otpStore[email];

  return res.status(200).json({ message: 'Password reset successfully' });

  }catch{
    return res.status(201).json({ error: 'Something went wrong, try again' });

  }
};

module.exports={resetPassword,sendOtp,otpVerification}
