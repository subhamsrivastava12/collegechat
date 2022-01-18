const {rejectRequest} = require("../service/rejectrequest");

module.exports.rejectRequest=async (req,res)=>{
    const senderId=req.body.senderId;
    const receiverId=req.cookies.userId;
    console.log("s",senderId);
    console.log("r",receiverId);
    rejectRequest(senderId,receiverId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

