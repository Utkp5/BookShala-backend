const express = require('express');
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const razorpay = require('razorpay');
const authFile = require("../Service/authentication")


//just for checking
router.get("/", function(req,res) {
    return res.send("all working fine");
})


//Registration
var salt = bcrypt.genSalt(10);
router.post("/Signup", async (req,res) => {

    try {
        
        const {firstName,lastName,userEmail,password,confirmPassword} = req.body;
        var hash = bcrypt.hashSync(req.body.password);
        var secondhash = bcrypt.hashSync(req.body.confirmPassword);
        const oldUser = await User.findOne({userEmail});

        if(!(firstName && lastName && userEmail && password && confirmPassword))
        {
            return res.status(400).send("Something you are missing");
        }
        else if (oldUser)
        {
            return res.status(400).send('You are already exist..Please login')
        }
        else if(password !== confirmPassword)
        {
            return res.status(400).send("Password does not match!");
        }
        else if(password.length < 8 && confirmPassword.length < 8)
        {
            return res.status(400).send('Password should have min 8 characters');
        }
        else 
        {
            await User.create({
                firstName : firstName,
                lastName : lastName,
                userEmail : userEmail,
                password : hash,
                confirmPassword : secondhash,
            })
        }

        return res.status(200).send('User created successfully');

    } catch (error) {

        console.log(error);
    }    
})


module.exports = router