const {createReply} = require("../service/createreply");


/*
req object
{
    "text":"type your reply"
}

*/

module.exports.createReply = async(req,res)=>{
    createReply(req,res)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}