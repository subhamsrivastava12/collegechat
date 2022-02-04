const Post = require("../model/post");
const Comment = require("../model/comment");

module.exports.deleteComment = async (commentId) => {
  var data = {};
  var response = {};
  var bool = true;
  var comment1 = {};
  var post1 = {};
  response = await Comment.find({ _id: commentId })
    .then((comment) => {
      comment1 = comment[0];
    })
    .catch((err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }

  const postId = comment1.postId;
  console.log("ide", postId);
  response = await Post.find({ _id: postId })
    .then((post) => {
      post1 = post[0];
    })
    .catch((err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }

  for (var i = 0; i < post1.comments.length; i++) {
    if (post1.comments[i] == commentId) {
      post1.comments.splice(i, 1);
      break;
    }
  }

  response = await Post.findByIdAndUpdate({ _id: postId }, post1).catch(
    (err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    }
  );

  if (!bool) {
    return response;
  }
  response = await Comment.findOneAndRemove({ _id: commentId })
    .then((val) => {
      data = {
        message: "comment deleted successfully",
        status: 200,
        output: true,
      };

      return data;
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };

      return data;
    });

  return response;
};
