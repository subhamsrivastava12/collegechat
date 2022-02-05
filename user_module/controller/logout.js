const dotenv = require("dotenv");

dotenv.config();


module.exports.logout=async (req,res)=>{
    
    res.clearCookie("username");
    res.clearCookie("jwt");
    res.clearCookie("userId");  
    res.send({message:"logout succesfully",status:200,output:true});  
   
}
