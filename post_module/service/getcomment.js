const Post = require("../model/post");


module.exports.getComment=async (postId,page)=>{
    var data={};
    var response={};
    response=await Post.find({"_id":postId},{comments:1})
            .populate("comments",{
               
                options:{ sort: { 'updatedAt': -1 } }
            }).limit(5).skip((page-1)*5)
            .then((post)=>{
                console.log("post",post);
                data={comments:post,status:200,output:true}
                return data;
            })
            .catch((err)=>{
                data={message:err.message,status:500,output:false}
                return data;
            })
            

    

    return response;
}