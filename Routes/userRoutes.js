const express = require("express");
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
        
        var hash = bcrypt.hashSync(req.body.password);
        var secondhash = bcrypt.hashSync(req.body.confirmPassword);

        const {firstName, lastName, userEmail, password, confirmPassword} = req.body;
        const letters = /^[a-zA-Z]*$/;
        const oldUser = await User.findOne({userEmail});

        if(!(firstName && lastName && userEmail && password && confirmPassword))
        {
            return res.status(400).send("Something you are missing");
        }
        else if(!(firstName.match(letters)) || !(lastName.match(letters)))
        {
             return res.status(400).send('Name does not contain special characters')
        }  
        else if(firstName === lastName)
        {
            return res.status(400).send('firstname and lastname should not same')
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
                firstname : req.body.firstName,
                lastame : req.body.lastName,
                useremail :req.body.userEmail,
                password : hash,
                confirmPassword : secondhash,
            })
        }

        return res.status(200).send('User created successfully');

    } catch (error) {

        console.log(error);
    }    
});



//Login
router.post("/Sigin", async(req,res) => {

    try {
        
        const user = await User.findOne({userEmail : req.body.userEmail});
        const check = bcrypt.compareSync(req.body.password, user.password);

        if(!(user && check)) {
            return res.status(401).send('Invalid Credentials')
        }

        const token = authFile.getToken(user._id);

        return res.status(200).send({
            token : token,
            userID : user._id
        });


    } catch (error) {

        console.log(error);
    }
});





module.exports = router