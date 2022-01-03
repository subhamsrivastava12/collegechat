const User = require('../model/user');
const bcrypt = require('bcrypt');


module.exports.login=async(email,password)=>{
    console.log("email ",email);
    User.findOne({
        email:email
    })
    .then((user)=>{
        console.log("user",user);
        if(!user){
            const data= {message:"user not found",status:404 ,output :false};
            console.log("data",data);
            return data;
        }
        const bool=bcrypt.compareSync(password,user.password);
        console.log("bool",bool);
        if(!bool){
            const data={message:"Invalid Credentials",status:200 ,output :false};
            console.log("data",data);
            return data;
        }
        if(!user.email_verified){
            const data={message:"Please verify your email",status:200 ,output :false};
            console.log("data",data);
            return data;
        }
        
        const data={message:"user login succesfully",status:200 ,output :true};
        console.log("data",data);
        return data;
    })
    .catch((err)=> {return data={ message: err.message ,status:500,output:false }});
}
