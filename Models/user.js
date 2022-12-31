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
        avatar : {
            type : String,
            default : "https://img.freepik.com/premium-psd/character-avatar-3d-illustration_460336-706.jpg?w=740"
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