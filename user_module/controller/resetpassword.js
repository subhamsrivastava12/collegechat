const dotenv = require("dotenv");
const {resetPassword}=require("../services/resetpassword");
dotenv.config();


module.exports.resetPassword=(req,res)=>{
    const data=resetPassword(req.params['token'],req.body.email,req.body.password);
    res.json(data);
}


