const {getUserprofile} = require("../services/getuserprofile");

module.exports.getUserprofile=async (req,res)=>{
    const userId=req.cookies.userId;
    const profileId=req.params.id;
    getUserprofile(userId,profileId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}
