const dotenv = require("dotenv");
const {resetPasswordVerification}=require("../services/resetpasswordverification");
dotenv.config();


module.exports.resetPasswordVerification=async (req,res)=>{
    const data=await resetPasswordVerification(req.params['token']);
    console.log("data",data);
    res.json(data);
}


