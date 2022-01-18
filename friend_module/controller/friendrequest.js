const {getRequest} = require("../service/friendrequest");

module.exports.getFriendrequest=async (req,res)=>{
    const userId=req.cookies.userId;
    getRequest(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

