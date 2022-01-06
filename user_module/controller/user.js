const Services = require("../services/user");


module.exports.getAllUsers=async (req,res)=>{
    const string =req.body.searchtext;
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
    Services.getUser(req.params.id)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

module.exports.updateUser=async (req,res)=>{
    const updatedValue={
        username:req.body.username,
        email:req.body.email,
        email_verified:false,
    }
    Services.updateUser(req.params["id"],req.body.email,updatedValue)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.deleteUser=async (req,res)=>{
    Services.deleteUser(req.params.id)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

