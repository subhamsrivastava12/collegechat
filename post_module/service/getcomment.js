const Post = require("../model/post");
const { profiletype } = require("../utils/profiletype");

module.exports.getComment = async (postId, page, userId) => {
  var data = {};
  var response = {};
  var post1 = {};
  response = await Post.find({ _id: postId }, { comments: 1, userId: 1 })
    .populate("comments", {
      options: { sort: { updatedAt: -1 } },
    })
    .limit(5)
    .skip((page - 1) * 5)
    .then((post) => {
      console.log("post", post);
      post1 = post[0];
      data = { comments: post, status: 200, output: true };
      return data;
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  response = await profiletype(userId, post1.userId)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!response.allowed) {
    return response;
  }
  response = { message: "comments made on this post",data:post1, status: 200, output: true };
  return response;
};
