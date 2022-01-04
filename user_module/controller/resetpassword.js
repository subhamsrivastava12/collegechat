const dotenv = require("dotenv");
const {resetPassword}=require("../services/resetpassword");

dotenv.config();


module.exports.resetPassword=(req,res)=>{
    resetPassword(req.params['token'],req.body.email,req.body.password)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}


