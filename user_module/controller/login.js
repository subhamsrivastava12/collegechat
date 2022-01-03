const dotenv = require("dotenv");
const {login}=require("../services/login");
dotenv.config();


module.exports.login=async (req,res)=>{
    console.log(req.body.email);
    const data=await login(req.body.email,req.body.password);
    console.log("data",data);
    res.json(data);
}
