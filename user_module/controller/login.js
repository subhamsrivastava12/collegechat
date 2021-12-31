const dotenv = require("dotenv");
const services=require("../services/login");
dotenv.config();


module.exports.login=(req,res)=>{
    const data=services.login(req.body.email,req.body.password);
    res.json(data);
}
