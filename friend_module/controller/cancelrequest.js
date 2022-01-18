const {cancelRequest} = require("../service/cancelrequest");

module.exports.cancelRequest=async (req,res)=>{
    const receiverId=req.body.receiverId;
    const senderId=req.cookies.userId;
    console.log("r",receiverId);
    console.log("s",senderId);
    cancelRequest(senderId,receiverId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

