const dotenv = require("dotenv");
const {login}=require("../services/login");
const bcrypt = require('bcrypt');

dotenv.config();


module.exports.login=async (req,res)=>{
    console.log(req.body.email);
    const data=await login(req.body.email,req.body.password);
    console.log("data",data);
    const token = data.token;
    console.log("token",token);
    if(!token){
        res.cookie("jwt",token,{
            httpOnly:true,
            maxAge:900000
        })
        
    }
    res.json(data);
}
