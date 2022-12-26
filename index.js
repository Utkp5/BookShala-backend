const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000


const dotenv = require('dotenv');
dotenv.config();



app.get("/", (req,res) => {
    return res.send("Bookshala")
})

app.listen(PORT, function(error) {

    if (error) {
        console.log(`Error in starting server`);
    }
    console.log(`Server started successfully on PORT : ${PORT}`);
})