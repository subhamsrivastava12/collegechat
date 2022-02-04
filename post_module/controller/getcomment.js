const {getComment} = require("../service/getcomment");


module.exports.getComment = async(req,res)=>{
    const postId=req.params.id;
    var userId=req.cookies.userId;

    var pageNo=1;
    if(req.params.page){
        pageNo=req.params.page;
    }
    console.log("postId",postId);
    getComment(postId,pageNo,userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}