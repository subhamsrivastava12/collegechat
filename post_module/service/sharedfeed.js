const User = require("../../user_module/model/user");
const Post = require("../model/post")

module.exports.sharedFeed=async (userId,page)=>{
    var response={};
    var data={};
    var posts={};
    var user1 = {};
    response=await User.find({"_id":userId},{sharedpost:1})
    .then((user)=>{
        console.log("post",posts);
        user1=user[0];
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })


    
    response = await User.find({"_id":userId},{sharedpost:1})
                .populate(
                    "sharedpost"
                ).limit(5).skip((page-1)*5)
            .then((post)=>{
                console.log("post",posts);
                data={"sharedfeed":post,status:200,output:true};
                return data;
            })
            .catch((err)=>{
                data={message:err.message,status:500,output:false}
                return data;
            })

    return response;
}