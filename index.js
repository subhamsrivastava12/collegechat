const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const userRoutes = require('./user_module/router/user');
const authRoutes = require('./user_module/router/auth');
const friendRoutes = require('./friend_module/router/friend');
const db = require("./config/dbconfig");
dotenv.config();


const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());


function middleware(req,res,next){
    req.db=db;
    req.db.connect();
    next();
}

app.use('/users',middleware,userRoutes);
app.use('/auth',middleware,authRoutes);
app.use('/friend',middleware,friendRoutes);

const PORT = process.env.PORT || 3000;


app.get('/ping',(req,res)=>{
    res.send("Hello World");
});

app.all('*',(req,res)=> {
    res.sendStatus(404);
  });

  app.listen(PORT,()=>console.log("server is running"))

// mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
//   .then(()=>app.listen(PORT,()=>console.log("server is running")))
//   .catch((error)=>
//   {
//       console.log(error.message);
//       process.exit();
//   });

  

