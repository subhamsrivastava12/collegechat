const dotenv = require("dotenv");
const {signUp}=require("../services/signup");
dotenv.config();


module.exports.signUp=async (req,res)=>{
    const data=await signUp(req.body.username,req.body.email,req.body.password);
    console.log("data",data);
    res.send(data);
}
