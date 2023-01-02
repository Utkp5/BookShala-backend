const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const logger = require("morgan");



//viewengine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));


//env
const dotenv = require('dotenv');
dotenv.config();


//database
const dbConfig = require("./Service/DBconfig");
dbConfig();


//User routes
const routes = require("./Routes/userRoutes");
app.use("/api", routes);
//forgot password routes
const frgtroutes = require("./Routes/forgotpassRoutes");
app.use("/api/Forgotpass",frgtroutes);
//books routes
const books = require("./Routes/booksRoutes");
app.use("/api/books", books);



app.listen(PORT, function(error) {

    if (error) {
        console.log(`Error in starting server`);
    }
    console.log(`Server started successfully on PORT : ${PORT}`);
})