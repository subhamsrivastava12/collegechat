const mongoose = require("mongoose");
const user = require('../model/user');


module.exports.getAllUsers=async(req,res)=>{
    res.json({message:'getALLuser'});
}

module.exports.getUser=async(req,res)=>{
    res.json({message:'getuser'});
}

module.exports.updateUser=async(req,res)=>{
    res.json({message:'updateuser'});
}

