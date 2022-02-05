const Services = require("../services/user");
const {updateUser} = require("../services/updateuser");
const {deleteUser} = require("../services/deleteuser");



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

/*
request object
{
    any key here can be updated

    "email":"***************@gmail.com",
    "password":"**********"
    "notification":true/false,
    public:true/false
    "role":["SDE","Data Scientist"],
    "interests":["CP","Designing"]
}
*/

module.exports.updateUser=async (req,res)=>{
    const userId=req.cookies.userId;
    const updatedValue={
        username:req.body.username,
        interests:req.body.interests,
        role:req.body.role,
        public:req.body.public,
        notification:req.body.notification
    }
    if(req.body.email){
        updatedValue.email=req.body.email;
        updatedValue.email_verified=false;
    }
    updateUser(userId,req.body.email,updatedValue)
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
    deleteUser(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

