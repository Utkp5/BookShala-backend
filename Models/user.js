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
            default : "https://cdnb.artstation.com/p/assets/images/images/048/945/941/large/cgcm-s5.jpg?1651322092"
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