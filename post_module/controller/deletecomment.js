const {deleteComment} = require("../service/deletecomment");


module.exports.deleteComment = async(req,res)=>{
    var commentId=req.params.id;
    deleteComment(commentId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}