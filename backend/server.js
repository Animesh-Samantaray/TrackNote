import express from "express";
import cors from 'cors';
import cookieparser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import noteRoute from './routes/note.route.js';
import connectDB from "./config/database.config.js";
import dotenv from 'dotenv';


dotenv.config();
connectDB();

const port = process.env.PORT;
const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieparser());



app.use('/api/auth',userRoute);
app.use('/api/note',noteRoute);



app.listen(port , (req,res)=>{
    console.log("app's backend strted on : http://localhost:5001");
    
})