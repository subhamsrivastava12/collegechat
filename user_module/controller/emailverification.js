const dotenv = require("dotenv");
const {emailVerification}=require("../services/emailverification");
dotenv.config();


module.exports.emailVerification=(req,res)=>{
    console.log(req.params.code);
    const data=emailVerification(req.params['code']);
    res.json(data);
}

