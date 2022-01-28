const {getReply} = require("../service/getreply");


module.exports.getReply = async(req,res)=>{
    const commentId=req.params.id;
    var pageno=1;
    if(req.params.page){
        pageno=req.params.page;
    }
    getReply(commentId,pageno)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}