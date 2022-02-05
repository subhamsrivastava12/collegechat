const User = require("../../user_module/model/user");


module.exports.sharePost=async (postId,sharedto,sharedby)=>{
    var response={};
    var data={};
    var user1={};
    var bool=true;
    
    response=await User.find({"_id":sharedto})
    .then((user)=>{
        user1=user[0];
    })
    .catch((err)=>{
        bool=false;
        data={message:err.message,status:500,output:false}
        return data;
    })
    if(user1.username==sharedby){
        response={message:"You can't share your post to yourself ",status:200,output:false}
        return response;
    }
    if(!bool){
        return response;
    }
    var newpost={
        postId:postId,
        sharedBy:sharedby
    }
    user1.sharedpost.push(newpost);
    response= await User.findByIdAndUpdate({ "_id": sharedto }, user1)
        .then((val) => {
            data = { message: "Post shared successfully", data:val,status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });

    return response;
}