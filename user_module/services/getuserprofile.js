const User = require("../model/user");

module.exports.getUserprofile = async (userId, profileId) => {
  var data = {};
  var response = {};
  var user1 = {};
  var bool = false;
  response = await User.find({ _id: profileId })
    .then((user) => {
      user1 = user[0];
    })
    .catch((err) => {
      bool = true;
      data = {
        message: err.message,
        status: 500,
        output: false,
        allowed: false,
      };
      return data;
    });

  if (bool) {
    return response;
  }
  console.log("public", user1.public);
  if (user1.public) {
    bool = true;
    data = { message: user1, status: 200, output: true, allowed: true };
    return data;
  }

  if (userId == profileId) {
    bool = true;
    data = { message: user1, status: 200, output: true, allowed: true };
    return data;
  }

  for (var i = 0; i < user1.friendsList.length; i++) {
    if (user1.friendsList[i].userId == userId) {
      bool = true;
      data = { message: user1, status: 200, output: true, allowed: true };
      return data;
    }
  }

  if (!bool) {
    data = {
      message: "This account is private",
      status: 200,
      output: true,
      allowed: false,
    };
    return data;
  }
};
