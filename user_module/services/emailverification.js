const mongoose = require("mongoose");
const User = require('../model/user');



module.exports.emailVerification=async(confirmationCode)=>{
    console.log("code ",confirmationCode);
    var data={};
    const response=await User.findOne({
        confirmationCode:confirmationCode,
    })
    .then((user)=>{
        if(!user){
            return data={
                message:"user not found",
                status:404,
                output:false
            }
            
        }
        user.email_verified=true;
        user.save((err)=>{
            if(err){
                data={
                    message:err.message,
                    status:500,
                    output:false
                }
                return data;
            }
            
        });
        return data={message:"account verify successfully",status:200,output:true};
    })
    .catch((err)=>{ return { message: err.message,status:500,output:false }});

    return response;

}

