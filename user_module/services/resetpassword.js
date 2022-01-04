const dotenv = require("dotenv");
const User = require('../model/user');
const bcrypt = require('bcrypt');

dotenv.config();


module.exports.resetPassword= async (token,email,password)=>{
    var data={};
    await User.findOne({
        email:email,
        resetPasswordtoken:token
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


    const hashed=bcrypt.hashSync(password,10);
    try{
        User.findByIdAndUpdate({ "_id": user._id }, {"password":hashed}, function (err, user) {
            if (err) {
                console.log("error");
                const data = { message: err.message, status: 500, output: false };
                return data;
            }
            data={message:"Password updated successfully",status:200,output:true};
            console.log(data);
            return data;
        });
    
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








