const dotenv = require("dotenv");
const {forgotPassword}=require("../services/forgotpassword");
dotenv.config();

/*
request object
{
    
    "email":"***************@gmail.com",
    "username":"**********"
}
*/

module.exports.forgotPassword = async (req,res)=>{
    forgotPassword(req.body.username,req.body.email)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}


