const {sharePost} = require("../service/sharepost")

module.exports.sharePost=async (req,res)=>{
    const postId=req.body.postId;
    const sharedto=req.body.sharedto;
    const sharedby=req.cookies.userId;
    sharePost(postId,sharedto,sharedby)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })

    
    
    
}
