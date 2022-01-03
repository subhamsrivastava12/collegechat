const Services = require("../services/user");


module.exports.getAllUsers=async (req,res)=>{
    const data= await Services.getAllUser();
    
    res.json(data);
    console.log(data);
}

module.exports.getUser=async (req,res)=>{
    const data= await Services.getUser(req.params.id);
    res.json(data);
}

module.exports.updateUser=async (req,res)=>{
    const data=await Services.updateUser(req.params.id);
    res.json(data);
}

module.exports.deleteUser=async (req,res)=>{
    const data=await Services.deleteUser(req.params.id);
    res.json(data);
}

