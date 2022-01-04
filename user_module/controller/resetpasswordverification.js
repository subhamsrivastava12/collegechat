const dotenv = require("dotenv");
const {resetPasswordVerification}=require("../services/resetpasswordverification");
dotenv.config();


module.exports.resetPasswordVerification=async (req,res)=>{
    resetPasswordVerification(req.params['token'])
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}


