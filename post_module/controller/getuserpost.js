const {getUserpost} = require("../service/getuserpost")

module.exports.getUserpost=async (req,res)=>{
    const userId=req.cookies.userId;
    console.log("userid",userId);
    getUserpost(userId)
    .then((data)=>{
        //console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
    
}
