const Services = require("../services/user");


module.exports.getAllUsers=async (req,res)=>{
    console.log("req",req.body);
    const string =req.body.searchtext;
    console.log("string",string);
    Services.getAllUser(string)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
    
}

module.exports.getUser=async (req,res)=>{
    const userId=req.cookies.userId;
    Services.getUser(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

module.exports.updateUser=async (req,res)=>{
    const userId=req.cookies.userId;
    const updatedValue={
        username:req.body.username,
        email:req.body.email,
        email_verified:false,
    }
    Services.updateUser(userId,req.body.email,updatedValue)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.deleteUser=async (req,res)=>{
    const userId=req.cookies.userId;
    console.log("deleteid",userId);
    Services.deleteUser(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

