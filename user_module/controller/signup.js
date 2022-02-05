const dotenv = require("dotenv");
const {signUp}=require("../services/signup");
dotenv.config();

/*
request object
{
    "username":"*******",
    "email":"******@gmail.com",
    "password":"*********"
}
*/

module.exports.signUp=async (req,res)=>{
    signUp(req.body.username,req.body.email,req.body.password)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}
