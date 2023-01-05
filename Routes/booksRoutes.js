const express = require('express');
const router = express.Router();
const Book = require("../Models/book");
const authFile = require('../Service/authentication');




//checking
router.get("/justcheckbook", function (req,res) {
    
    return res.status(200).send('all ok books');
})



//create book api
router.post("/addBooks", async(req,res) => {

    try {
        
        const {bookImg,bookTitle,bookAuthor,genres,language,rating,type,price,authorDescription,bookDescription,bookDesmore} = req.body;

        if (!(bookImg && bookTitle && bookAuthor && genres && language && rating && type && price && authorDescription && bookDescription && bookDesmore)) {
            
            return res.status(405).send('Require all fields');
        }
        else{

             await Book.create({
                bookImg : bookImg,
                bookTitle : bookTitle,
                bookAuthor : bookAuthor,
                genres : genres,
                language : language,
                rating : rating,
                type : type,
                price : price,
                authorDescription : authorDescription,
                bookDescription : bookDescription,   
                bookDesmore : bookDesmore,             
            });
        }

        return res.status(200).send('Single Book created successfully');

    } catch (error) {

        console.log(error);
    }

})



//delete one book
router.delete("/deleteBook", async(req,res) => {

    try {
        
        const id = req.body.id;
        const temp = await Book.findByIdAndDelete(id);
        const final = temp.bookTitle;
    
        return res.status(200).send(`${final} book deleted successfully`);

    } catch (error) {
        
        console.log(error);
    }
});




//get all books
router.get("/getBooks", async(req,res) => {

    try {
        
        const all = await Book.find({});
        return res.status(200).send(all);

    } catch (error) {
        
        console.log(error);
    }

})

//find book by id
router.get("/findbook/:bookid", async(req,res) => {

    try {
        
        if (!Book) {
            return res.status(401).send(`Your book not found!`);
        }
    
        const bookid = req.params.bookid;
    
        const boook = await Book.findById(bookid);
    
        return res.status(200).send(boook);

    } catch (error) {
        console.log(error);
    }

})


module.exports = router;