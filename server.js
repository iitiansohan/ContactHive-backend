const express=require('express');
const connectDb=require("./config/dbConnection");
const dotenv =require('dotenv').config();
const errorHandler=require("./middleware/errorHandler");


connectDb();
const app=express();


const port=process.env.PORT||5000;
app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);//if error is thrown in above routes then express throws it to the errorHandler middleware
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})