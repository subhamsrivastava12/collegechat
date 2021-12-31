const dotenv = require("dotenv");
const services=require("../services/resetpasswordverification");
dotenv.config();


module.exports.resetPasswordVerification=(req,res)=>{
    const data=services.resetPasswordVerification(req.params.token);
    res.json(data);
}


