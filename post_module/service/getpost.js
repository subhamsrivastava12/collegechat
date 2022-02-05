const Post = require("../model/post");
const User = require("../../user_module/model/user");
const { profiletype } = require("../utils/profiletype");
module.exports.getPost = async (postId, userId) => {
  var response = {};
  var data = {};
  var post1 = {};
  var user1 = {};
  var bool = false;
  response = await Post.find({ _id: postId })
    .then((post) => {
      post1 = post[0];
    })
    .catch((err) => {
      bool = true;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (bool) {
    return response;
  }

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
  response = { message:"post details",data: post1, status: 200, output: true };
  return response;
};
