const {getPost} = require("../service/getpost")

module.exports.getPost=async (req,res)=>{
    const postId=req.params.id;
    const userId=req.cookies.userId;
    getPost(postId,userId)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
    
}
