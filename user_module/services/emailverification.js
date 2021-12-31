const mongoose = require("mongoose");
const User = require('../model/user');



module.exports.emailVerification=async(confirmationCode)=>{
    const data={};
    User.findOne({
        confirmationCode:confirmationCode,
    })
    .then((user)=>{
        if(!user){
            return data={
                message:"user not found",
                status:404
            }
            
        }
        user.email_verified=true;
        user.save((err)=>{
            if(err){
                data={
                    message:err.message,
                    status:500
                }
                return data;
            }
            
        });
        return data={message:"account verify successfully",status:200,output:true};
    })
    .catch((err)=>{ return { message: err.message,status:500 }});
}

