const Comment = require("../model/comment");


module.exports.getReply=async (commentId,page)=>{
    
    var data={};
    var response={};
    response=await Comment.find({"_id":commentId},{reply:1})
            .populate("reply",{
                
                options:{ sort: { 'updatedAt': -1 } }
            }).limit(5).skip((page-1)*5)
            .then((comment)=>{
                data={reply:comment,status:500,output:false}
                return data;
            })
            .catch((err)=>{

                data={message:err.message,status:500,output:false}
                return data;
            })
    


    return response;
}