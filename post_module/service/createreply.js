const Comment = require("../model/comment");
const Post = require("../model/post");


module.exports.createReply = async (req, res) => {
    var commentId = req.params.id;
    var replyId = {};
    var comment1 = {};
    var bool = true;
    var data = {};
    var response = {};
    console.log("commentid", commentId);
    response = await Comment.find({ "_id": commentId })
        .then((comment) => {
            comment1 = comment[0];
            console.log("comment", comment1);
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false }
            return data;
        })
    if (!bool) {
        return response;
    }

    if (comment1.author == req.cookies.userId) {
        response = { message: "you can't reply to your own post", status: 200, output: false };
        return response;
    }
    const reply = new Comment({
        text: req.body.text,
        postId: comment1.postId,
        author: req.cookies.userId
    })
    replyId = reply._id;
    comment1.reply.push(replyId);
    console.log("reply", comment1.reply);

    response = await reply.save()
        .catch((err) => {
            bool = false
            data = { message: err.message, status: 500, output: false }
            return data;
        })
    if (!bool) {
        return response;
    }


    response = await Comment.findByIdAndUpdate({ "_id": commentId }, comment1)
        .then((val) => {
            data = { message: "reply made successfully", status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });


    return response;
}