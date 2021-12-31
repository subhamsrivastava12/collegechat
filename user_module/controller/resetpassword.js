const dotenv = require("dotenv");
const services=require("../services/resetpassword");
dotenv.config();


module.exports.resetpassword=(req,res)=>{
    const data=services.resetpassword(req.body.email,req.body.password);
    res.json(data);
}


