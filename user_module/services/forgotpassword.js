const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const bcrypt = require('bcrypt');
const helper = require("../helper/forgotpassword");

dotenv.config();




module.exports.forgotPassword= async (username,email)=>{
    var data={};
    var user1={};
    var bool = false;
    const response = await User.findOne({
        email:email,
    })
    .then((user)=>{
        //console.log("user",user);
        user1=user;
        if(!user){
            bool=true;
            data={
                message:"user not found",
                status:404,
                output:false
            }
            return data;
            
        }
        if(!user.email_verified){
            bool=true;
            data={
                message:"verify your email first",
                status:200,
                output:false
            }
            return data;
        }
    })     
    .catch((err)=>{ bool=true; return { message: err.message,status:500 ,output:false}});

    if(bool){
        return response;
    }
    console.log("user1",user1);
    
    const token = jwt.sign({email:email},process.env.SECRET);
    console.log("token",token);
    
    await User.findByIdAndUpdate({ "_id": user1._id }, {"resetPasswordtoken":token})
    .catch((err)=>{
        bool=true;
        data = { message: err.message, status: 500, output: false };
        return data;
    })
    if(!bool){
    const response1=await helper.sendMail(username,email,token)
        .then((val)=>{
            console.log("val",val);
            return val;
        })
        .catch((err)=>{
            data = { message: err.message, status: 500, output: false };
            return data;
        })
        


    console.log("response1",response1)
    
    return response1;
    }

}

