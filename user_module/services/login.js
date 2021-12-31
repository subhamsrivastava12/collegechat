const User = require('../model/user');
const bcrypt = require('bcrypt');


module.exports.login=(req,res,next)=>{
    User.findOne({
        email:req.body.email
    })
    .then((user)=>{
        if(!user){
            return {message:"user not found",status:404 ,output :false};;
        }
        const bool=bcrypt.compareSync(req.body.password,user.password);
        if(!bool){
            res.send({message:"Invalid credentials"});
        }
        if(!user.email_verified){
            res.send({message:"Please verify your email"});
        }
        
        const data={message:"user login succesfully",status:200 ,output :true};
        return data;
    })
    .catch((err)=> {return { message: err.message ,status:500,output:false }});
}
