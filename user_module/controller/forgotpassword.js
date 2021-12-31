const dotenv = require("dotenv");
const services=require("../services/forgotpassword");
dotenv.config();


module.exports.forgotpassword=(req,res)=>{
    const data=services.forgotpassword(req.username,req.email);
    res.json(data);
}


