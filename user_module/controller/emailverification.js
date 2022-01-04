const dotenv = require("dotenv");
const {emailVerification}=require("../services/emailverification");
dotenv.config();


module.exports.emailVerification=(req,res)=>{
    console.log(req.params.code);
    emailVerification(req.params['code'])
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

