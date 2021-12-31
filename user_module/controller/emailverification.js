const dotenv = require("dotenv");
const services=require("../services/emailverification");
dotenv.config();


module.exports.emailVerification=(req,res)=>{
    const data=services.emailVerification(req.params.code);
    res.json(data);
}

