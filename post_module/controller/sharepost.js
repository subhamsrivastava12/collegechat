const {sharePost} = require("../service/sharepost")

/*
 
  req {
    "postId":"61f373d7b196e994803a63d6",
    "sharedto":"61e5d20f0a76845ec53e4db1"
  } 
 */

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
