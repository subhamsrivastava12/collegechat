const mongoose = require("mongoose");
const User = require('../model/user');



module.exports.resetPasswordVerification=async(token)=>{
    const data={};
    User.findOne({
        resetPasswordtoken:token,
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
                message:"verify your email id first",
                status:200,
                output:false
            }
        }
        return data={message:"you can now reset your password",status:200,output:true};
    })
    .catch((err)=>{ return { message: err.message , status:500 ,output:false }});
}

