const dotenv = require("dotenv");
const Services=require("../services/forgotpassword");
dotenv.config();




module.exports.forgotPassword = async (req,res)=>{
    const data=await Services.forgotPassword(req.body.username,req.body.email);
    res.json(data);
}


