const Post = require("../model/post");


module.exports.getPost=async (postId)=>{
    var response={};
    var data={};
    response=await Post.find({"_id":postId})
    .then((post)=>{
        console.log("post",post);
        data={"post":post,status:200,output:true};
        return data;
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })
    return response;
}