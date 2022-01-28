const {deletePost} = require("../service/deletepost");


module.exports.deletePost = async(req,res)=>{
    var postId=req.params.id;
    var userId=req.cookies.userId;
    deletePost(postId,userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}