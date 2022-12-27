const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const logger = require("morgan");



//env
const dotenv = require('dotenv');
dotenv.config();

//database
const dbConfig = require("./Service/DBconfig");
dbConfig();


app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));



app.get("/", (req,res) => {
    return res.send("Bookshala")
})

app.listen(PORT, function(error) {

    if (error) {
        console.log(`Error in starting server`);
    }
    console.log(`Server started successfully on PORT : ${PORT}`);
})