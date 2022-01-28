const User = require("../../user_module/model/user");


module.exports.getUserpost=async (userId)=>{
    var response={};
    var data={};
    console.log("id",userId);
    response=await User.findOne({"_id":userId},{post:1})
    .populate("post")
    .then((posts)=>{
        data={"post":posts,status:200,output:true};
        return data;
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })
    return response;
}