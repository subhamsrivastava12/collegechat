const mongoose = require("mongoose");
const User = require('../model/user');



module.exports.resetPasswordVerification=async(token)=>{
    let data ={};
    await User.findOne({
        resetPasswordtoken:token,
    })
    .then((user)=>{
        console.log(user);
        if(!user){
            return data={
                message:"user not found",
                status:404,
                output:false
            }
            
        }
        if(!user.email_verified){
            return data={
                message:"verify your email id first",
                status:200,
                output:false
            }
        }
        data={message:"you can now reset your password",status:200,output:true};
        console.log("data",data);
        return data;
    })
    .catch((err)=>{ return data={ message: err.message , status:500 ,output:false }});
}

