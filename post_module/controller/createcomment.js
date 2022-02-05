const {createComment} = require("../service/createcomment");


/*
req object
{
    "text":"type your comment"
}

*/

module.exports.createComment = async(req,res)=>{
    
    createComment(req,res)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}