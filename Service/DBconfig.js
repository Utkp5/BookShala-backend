const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const dbconnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Utkarsh5:${process.env.MONGODB_PASSWORD}@cluster0.allij.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(`Error in Connecting to mongoDB ${error}`);
    }
};


module.exports = dbconnect;