const {like} = require("../service/like")

module.exports.like=async (req,res)=>{
    const postId=req.params.id;
    const likeId=req.cookies.userId;
    like(postId,likeId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
    
}
