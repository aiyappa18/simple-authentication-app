import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();
import { UserRouter } from './routes/user.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'

// const express=require('express') 
//if we dont use the type:module in the package.json file we will have to use like this

const app=express() //creating an instance of the express server
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(cookieParser());
app.use('/auth',UserRouter);
mongoose.connect(process.env.MONGODB_URI);

app.listen(process.env.PORT,()=>{
    console.log("running");
})