const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require('../model/user');

dotenv.config();

module.exports.authorization= async (req,res,next)=>{
    
    const token = req.cookies.jwt;
    if(!token){
        return res.status(403).send("You don't have access");
    }
    try{
        jwt.verify(token,process.env.SECRET,(err,data)=>{
            if(err){
                return res.status(403).send("You don't have access");
            }
            else if(data.email){
                
                User.findOne({
                    email:data.email
                
                })
                .then((user)=>{
                    if(!user){
                        
                        return res.status(404).send("User doesn't exist");
                        
                    }
                    return next();
                         
                })
                .catch((err)=>{
                    console.log(err.message);
                    return res.status(500).send("server error");
                })
            }
            
        });
        
    }
    catch{
        return res.status(500).send("server error");
        
    }
    
};