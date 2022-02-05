const Comment = require("../model/comment");


module.exports.updateComment=async (req)=>{
    const commentId=req.params.id;
    var data={};
    var updatedComment = {
        text: req.body.text,
    };

    response= await Comment.findByIdAndUpdate({ "_id": commentId }, updatedComment)
        .then((val) => {
            data = { message: "Comment updated successfully", data:val,status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });


    return response;
}