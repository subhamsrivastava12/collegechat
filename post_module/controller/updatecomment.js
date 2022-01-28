const {updateComment} = require("../service/updatecomment");


module.exports.updateComment = async(req,res)=>{
    
    updateComment(req)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}