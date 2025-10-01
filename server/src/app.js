import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./ConnectDb/mongoDb.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Quiz App");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async()=>{
    try {
     await connectDB();
     console.log(`server is running on PORT no.${PORT} !`);    
    } catch (err) {
        console.log("Server Failed", err.message);
        
    }
});