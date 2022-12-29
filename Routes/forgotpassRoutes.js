const express = require('express');
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const authFile = require("../Service/authentication");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


router.post("/Forgotpassword", async (req, res) => {
    const { userEmail} = req.body;
    try {
      const oldUser = await User.findOne({userEmail});
      if (!oldUser) {
        return res.status(401).json({ status: "User Not Exists!!" }); // here we can use it .send also 
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ userEmail: oldUser.userEmail, userid : oldUser._id},secret, {
            expiresIn: "5m",
      });
      const link = `http://localhost:5000/api/resetpassword/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: 'gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      var mailOptions = {
        from: process.env.GMAIL,
        to: userEmail,
        subject: "Password Reset",
        html: `<h2>Do not reply on this email as this email is bot</h2>
        <h3>Click on the below button to Reset Your Password</h3>
        <a href=${link}><Button style="background-color:yellow;color:brown;padding:8px 8px;border-radius:8px;">Reset Password</Button></a><br>
        <h3>Or Click on the below link to Reset Your Password</h3>
        <p>${link}</p>`,
        // text: link,

      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log(link);
      return res.send("sent");
    } catch (error) {
        console.log(error);
    }
  });



  router.get("/resetpassword/:id/:token", async (req, res, next) => {
    const { id, token } = req.params;
     console.log(req.params);
     const { userEmail} = req.body;
     const oldUser = await User.findOne({_id : id});
     if (!oldUser) {
       return res.json({ status: "User Not Exists!" });
     }
     const secret = JWT_SECRET + oldUser.password;
     try {
       const decoded = jwt.verify(token, secret);
        res.render("../Handlebars/index.ejs", { userEmail : decoded.userEmail,  status: "Not verified" });
        // return res.json({status: "verified"})
     } catch (error) {
       console.log(error);
      //  return res.json({status: "Not Verified"})
     }

  });



  router.post("/resetpassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password, userEmail } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const decoded = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, salt);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      res.render("../Handlebars/index.ejs", { userEmail: decoded.userEmail, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });


  module.exports = router