const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const Book = require("../Models/book");
const bcrypt = require('bcryptjs');
const authFile = require("../Service/authentication")


//just for checking
router.get("/", function(req,res) {
    return res.send("all working fine");
})


//Registration
var salt = bcrypt.genSalt(10);
router.post("/Signup", async (req,res) => {

    try {
        
        
        const {firstName, lastName, userEmail, password, confirmPassword} = req.body;
        var hash = bcrypt.hashSync(req.body.password);
        var secondhash = bcrypt.hashSync(req.body.confirmPassword);
        const letters = /^[a-zA-Z]*$/;
        const rgemail = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}&/
        const oldUser = await User.findOne({userEmail});

        if(!(firstName && lastName && userEmail && password && confirmPassword))
        {
            return res.status(400).send("Something you are missing");
        }
        else if(!(firstName.match(letters)) || !(lastName.match(letters)))
        {
             return res.status(400).send('Name does not contain special characters')
        } 
        else if(!userEmail.test(rgemail))
        {
            return res.status(400).send('Email is not correct!');
        }
        else if(firstName === lastName)
        {
            return res.status(400).send('firstname and lastname should not same')
        }
        else if (oldUser)
        {
            return res.status(409).send('You are already exist..Please login')
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
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                userEmail :req.body.userEmail,
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
router.post("/Signin", async (req,res) => {

    try {

        const user = await User.findOne({userEmail : req.body.userEmail});
        const check = bcrypt.compareSync(req.body.password, user.password);
    
        if(!(user && check)){
            return res.status(401).send("Invalid Credentials");
        }
        
        const token = authFile.getToken(user._id);
        return res.status(200).send({
            userID : user._id,
            token : token,
            firstName : user.firstName,
            userEmail : user.userEmail,
            avatar : user.avatar,
            "message" : "User login successfully"
        });

    } catch (error) {
        console.log(error);
    }
});



//fetch all user stored in database
router.get("/getalluser", async (req,res) => {
    try {
        
        const users = await User.find({});
        return res.send(users);

    } catch (error) {
        console.log(error);
    }
})



//delete user
router.delete("/delete", async(req,res) => {
    try {
        
        const id = req.body.id;
        const z = await User.findByIdAndDelete(id);
        const fname = z.firstName;
        const lname = z.lastName
        return res.send(`${fname} ${lname} Deleted Successfully`);

    } catch (error) {
        console.log(error);
    }
})



//books book by user
router.post("/bookspurchase/:bookid", async(req,res) => {
    try {
        
        const bookid = req.params.bookid;
        const userid = req.body.userid;

        const updatedUser = await User.findByIdAndUpdate(userid,{

            $push : {booksbooked : bookid}
        },
        {
            new : true,
            runValidators : true,
        });

        const bookID = updatedUser.booksbooked;
        const userName = updatedUser.firstName;
        return res.status(200).send(`${userName} is successfully purchased this book with id of : ${bookID}`);
        

    } catch (error) {
        console.log(error);
    }
});




//delete user book what he/she purchased not working
// router.delete("/deleteuserbook/:bookid", async(req,res) => {

//     const bookid = req.params.bookid;
//     const userid = req.body.userid;

//     const deleted = await User.findById(userid);
//     const z = deleted.booksbooked
//     const final = z.findByIdAndDelete(bookid);

//     return res.send("deleted");
        

// })


module.exports = router