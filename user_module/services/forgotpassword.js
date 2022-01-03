const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const bcrypt = require('bcrypt');
const helper = require("../helper/forgotpassword");

dotenv.config();




module.exports.forgotPassword=async(username,email)=>{
    const data={};
    await User.findOne({
        email:email,
    })
    .then((user)=>{
        console.log("user",user);
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
        const token = jwt.sign({email:email},process.env.SECRET);
        User.findByIdAndUpdate({ "_id": user._id }, {"resetPasswordtoken":token}, function (err, user) {
            if (err) {
                console.log("1 error");
                const data = { message: err.message, status: 500, output: false };
                return data;
            }
            return helper.sendMail(username,email,token);
        });

        
        
    })
    .catch((err)=>{ return { message: err.message,status:500 ,output:false}});
}

