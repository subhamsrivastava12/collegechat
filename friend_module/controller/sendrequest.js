const {sendRequest} = require("../service/sendrequest");

module.exports.sendRequest=async (req,res)=>{
    const receiverId=req.body.receiverId;
    const receiverName=req.body.receiverName;
    const senderId=req.cookies.userId;
    const senderName=req.cookies.username;
    sendRequest(senderId,senderName,receiverId,receiverName)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

