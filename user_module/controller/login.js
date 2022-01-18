const dotenv = require("dotenv");
const {login}=require("../services/login");

dotenv.config();


module.exports.login=async (req,res)=>{
    login(req.body.email,req.body.password)
    .then((data)=>{
        console.log("data",data);
        const token = data.token;
        data.token=null;
        const userId = data.userId;
        const username = data.username;
        console.log("token",token);
        if(token){
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:9000000
            });
            res.cookie('userId',userId,{
                httpOnly:true,
                maxAge:9000000
            })
            res.cookie('username',username,{
                httpOnly:true,
                maxAge:9000000
            })
            
        }
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })

    
    
    
}
