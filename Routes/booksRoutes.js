const express = require('express');
const router = express.Router();
const Book = require("../Models/book");
const authFile = require('../Service/authentication');




//checking
router.get("/justcheckbook", function (req,res) {
    
    return res.status(200).send('all ok books');
})



//create book api
router.post("/addBooks", authFile.authenticationChecker, async(req,res) => {

    try {
        
        const {bookImg,bookTitle,bookAuthor,genres,language,rating,type,price,description,summary} = req.body;

        if (!(bookImg && bookTitle && bookAuthor && genres && language && rating && type && price && description && summary)) {
            
            return res.status(401).send('Require all fields');
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
                description : description,
                summary : summary,                
            });
        }

        return res.status(200).send('Single Book created successfully');

    } catch (error) {

        console.log(error);
    }

})



//delete one book
router.post("/deleteBook", authFile.authenticationChecker, async(req,res) => {

    try {
        
        const id = req.body.id;
        const temp = await Book.findByIdAndDelete(id);
        const final = temp.bookTitle;
    
        return res.status(200).send(`${final} deleted successfully`);

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



module.exports = router;