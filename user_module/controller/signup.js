const dotenv = require("dotenv");
const services=require("../services/signup");
dotenv.config();


module.exports.signUp=(req,res)=>{
    const data=services.signUp(req.body.email,req.body.email,req.body.password);
    res.json(data);
}
