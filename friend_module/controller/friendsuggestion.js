const {getFriendsuggestion} = require("../service/friendsuggestion");

module.exports.getFriendsuggestion=async (req,res)=>{
    const userId=req.cookies.userId;
    getFriendsuggestion(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}

