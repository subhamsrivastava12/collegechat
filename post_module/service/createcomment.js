const Comment = require("../model/comment");
const Post = require("../model/post");


module.exports.createComment = async (req, res) => {
    const postId = req.params.id;
    var commentId = {};
    var bool = true;
    var post1 = {};
    var data = {};
    var response = {};
    const newcomment = new Comment({
        text: req.body.text,
        postId: postId,
        author: req.cookies.userId
    })
    commentId = newcomment._id;

    response = await newcomment.save()
        .catch((err) => {
            bool = false
            data = { message: err.message, status: 500, output: false }
            return data;
        })
    if (!bool) {
        return response;
    }

    response = await Post.find({ "_id": postId })
        .then((post) => {
            post1 = post[0];
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false }
            return data;
        })
    if (!bool) {
        return response;
    }

    post1.comments.push(commentId);

    response = await Post.findByIdAndUpdate({ "_id": postId }, post1)
        .then((val) => {
            data = { message: "Comment posted successfully", status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });


    return response;
}