import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_DB_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDb Connected Successfully!");
    } catch (err) {
        console.log("MongoDB Connection Failed", err.message);
    }
};

export default connectDB;

