const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const bcrypt = require('bcrypt');
const helper = require("../helper/sendmail");

dotenv.config();


module.exports.signUp=(username,email,password)=>{
    const token = jwt.sign({email:req.body.email},process.env.SECRET);

    const user = new User({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,10),
        confirmationCode: token

    });

    user.save((err)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }
        
        
        return helper.sendMail(user.username,user.email,user.confirmationCode);

    });
}
