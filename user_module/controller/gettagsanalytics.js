const {getTagsanalytics} = require("../services/gettagsanalytics");


module.exports.getTagsanalytics=async (req,res)=>{
    const userId=req.cookies.userId;
    console.log("uid",userId);
    getTagsanalytics(userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
}