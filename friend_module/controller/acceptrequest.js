const {acceptRequest} = require("../service/acceptrequest");

/*
req object
{
    "senderId":"************",
    "senderName":"**************"
}

*/ 

module.exports.acceptRequest=async (req,res)=>{
    const senderId=req.body.senderId;
    const senderName=req.body.senderName;
    const receiverId=req.cookies.userId;
    const receiverName=req.cookies.username;
    acceptRequest(senderId,senderName,receiverId,receiverName)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

