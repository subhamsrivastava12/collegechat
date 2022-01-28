const {updatePost} = require("../service/updatepost")


module.exports.updatePost = async(req,res)=>{
    updatePost(req,res)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}