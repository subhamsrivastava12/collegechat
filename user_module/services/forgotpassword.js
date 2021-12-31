const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const bcrypt = require('bcrypt');
const helper = require("../helper/forgotpassword");

dotenv.config();




module.exports.forgotpassword=async(username,email)=>{
    const data={};
    User.findOne({
        email:email,
    })
    .then((user)=>{
        if(!user){
            return data={
                message:"user not found",
                status:404,
                output:false
            }
            
        }
        if(!user.email_verified){
            return data={
                message:"verify your email first",
                status:200,
                output:false
            }
        }
        const token = jwt.sign({email:req.body.email},process.env.SECRET);

        
        return helper.sendMail(username,email,token);
    })
    .catch((err)=>{ return { message: err.message,status:500 ,output:false}});
}

