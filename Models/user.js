const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
    {
        firstName : {
            type : String,
            require : true,
        },
        lastName : {
            type : String,
            require : true,
        },
        userEmail : {
            type : String,
            require : true,
        },
        password : {
            type : String,
            require : true,
        },
        confirmPassword : {
            type : String,
            require : true,
        },
        booksbooked : [{
            type : String,
        }],
    },
    {
        timestamps : true,
    }
);



const User = mongoose.model("User",userSchema);
module.exports = User;