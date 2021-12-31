const dotenv = require("dotenv");
const User = require('../model/user');
const bcrypt = require('bcrypt');

dotenv.config();


module.exports.resetpassword=(email,password)=>{

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
                message:"verify your email id first",
                status:200,
                output:false
            }
        }


    const hashed=bcrypt.hashSync(password,10);
    try{

    User.findOneAndUpdate({email:email},{password:hashed})
    return data={
        message:"password changed succesfully",
        status:200,
        output:true
    }
    }
    catch(err){
        return data={
            message:err.message,
            status:500,
            output:false
        }
    }        

    });
}








