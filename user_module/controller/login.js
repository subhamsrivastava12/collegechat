const dotenv = require("dotenv");
const {login}=require("../services/login");
const bcrypt = require('bcrypt');

dotenv.config();


module.exports.login=async (req,res)=>{
    login(req.body.email,req.body.password)
    .then((data)=>{
        console.log("data",data);
        const token = data.token;
        console.log("token",token);
        if(token){
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:900000
            })
            
        }
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })

    
    
    
}
