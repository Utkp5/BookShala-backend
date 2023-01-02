const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        bookImg : {
            type : String,
            require : true,
        },
        bookTitle : {
            type : String,
            require : true,
        },
        bookAuthor : {
            type : String,
            require : true,
        },
        genres : {
            type : String,
            require : true,
        },
        language : {
            type : String,
            require : true,
        },
        rating : {
            type : Number,
            require : true,
        },
        type : {
            type : String,
            require : true,
        },
        price : {
            type : Number,
            require : true,
        },
        description : {
            type : String,
            require : true,
        },
        summery : {
            type : String,
            require : true,
        },
    },
    {
        timestamps : true,
    }
);

const Book = mongoose.model("Book",bookSchema);
module.exports = Book;