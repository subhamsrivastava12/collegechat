const User = require("../../user_module/model/user");
const Post = require("../model/post");

module.exports.getFeed = async (userId, page) => {
  var response = {};
  var data = {};
  var posts = {};
  var user1 = {};
  var bool = true;

  response = await User.find({ _id: userId }, { friendsList: 1 })
    .then((user) => {
      user1 = user[0];
    })
    .catch((err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }
  for (var i = 0; i < user1.friendsList.length; i++) {
    var friend = user1.friendsList[i];
    var newfriend = await User.find({ _id: friend.userId }, { post: 1 });
    posts = [...newfriend[0].post.slice(0, 5)];
  }
  console.log("post", posts);
  response = await Post.find(
    { _id: { $in: posts } },
    { caption: 1, description: 1 },
    { sort: { updatedAt: -1 } }
  )
    .skip((page - 1) * 5)
    .limit(5)
    .then((post) => {
      data = { message:"users feed",data: post, status: 200, output: true };
      return data;
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  return response;
};
