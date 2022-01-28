const Post = require("../model/post");


module.exports.like=async (postId,likeId)=>{
    var response={};
    var data={};
    var post1={};
    var bool=true;
    response=await Post.find({"_id":postId})
    .then((post)=>{
        console.log("post",post);
        post1=post[0];
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })
    for(var i=0;i<post1.likeId.length;i++){
        if(post1.likeId[i]==likeId){
            post1.likeId.splice(i, 1);
            post1.like--;
            bool =false;
            break;
        }
    }
    if(bool){
        post1.likeId.push(likeId);
        post1.like++;
    }
    response= await Post.findByIdAndUpdate({ "_id": postId }, post1)
        .then((val) => {
            data = { message: "Like operation performed successfully", status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });

    return response;
}