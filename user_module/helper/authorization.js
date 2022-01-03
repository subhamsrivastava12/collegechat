const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require('../model/user');

dotenv.config();

module.exports.authorization= async (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token){
        res.status(403).send("You don't have access");
    }
    try{
        jwt.verify(token,process.env.SECRET,(err,data)=>{
            if(err){
                res.status(403).send("You don't have access");
            }
            else if(data.email){
                
                User.findOne({
                    email:data.email
                
                })
                .then((user)=>{
                    if(!user){
                        
                        res.status(404).send("server error");
                        
                    }
                         
                })
                .catch((err)=>{
                    console.log(err.message);
                    res.status(500).send("server error");
                })
            }
            
        });
        next();
        
    }
    catch{
        res.status(500).send("server error");
        
    }
};