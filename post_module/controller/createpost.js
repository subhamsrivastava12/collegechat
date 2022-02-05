const {createPost} = require("../service/createpost");

//form-data
/*
{
    key    --   value
    -------------------------
    caption - "give your caption"
    tags    -  "#tag"
    image   -   "file"
}
*/

module.exports.createPost = async(req,res)=>{
    console.log("reqfiles",req.body);

    createPost(req,res)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}