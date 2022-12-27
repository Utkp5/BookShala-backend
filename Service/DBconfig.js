const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(`Error in Connecting to mongoDB ${error}`);
    }
};


module.exports = dbconnect;