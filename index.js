const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const userRoutes = require('./user_module/router/user');
const authRoutes = require('./user_module/router/auth');


dotenv.config();

const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/users',userRoutes);
app.use('/auth',authRoutes);

const PORT = process.env.PORT || 3000;


app.get('/ping',(req,res)=>{
    res.send("Hello World");
});

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log("server is running")))
    .catch((error)=>console.log(error.message));

