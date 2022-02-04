const User = require("../../user_module/model/user");
const Post = require("../model/post");

module.exports.getUserpost = async (userId, page, requserId) => {
  var response = {};
  var data = {};
  var user1 = {};
  var bool = false;
  console.log("id", userId);
  response = await User.find(
    { _id: requserId },
    { post: 1, public: 1, friendsList: 1 }
  )
    .populate("post")
    .limit(5)
    .skip((page - 1) * 5)
    .then((user) => {
      user1 = user[0];
      console.log("user", user[0]);
      data = { post: user[0].post, status: 200, output: true };
      return data;
    })
    .catch((err) => {
      bool = true;
      console.log("err1", err.message);
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (bool) {
    return response;
  }
  if (requserId == userId) {
    return response;
  }

  if (user1.public) {
    return response;
  }

  for (var i = 0; i < user1.friendsList.length; i++) {
    if (user1.friendsList[i].userId == userId) {
      bool = true;
      data = { message: user1, status: 200, output: true };
      return data;
    }
  }

  if (!bool) {
    data = { message: "This account is private", status: 200, output: true };
    return data;
  }
};
