const User = require("../../user_module/model/user");

module.exports.getFriendsuggestion = async (userId) => {
  var data = {};
  var user1 = {};
  var suggestion = [];
  var bool = true;
  var response = {};
  var interest = {};
  response = await User.find({ _id: userId }, { interests: 1 })
    .then((user) => {
      user1 = user[0];
    })
    .catch((err) => {
      console.log("err1", err.message);
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }
  interest = user1.interests;
  console.log("interests", interest);
  response = await User.find({ interests: { $in: interest } })
    .then((user) => {
      suggestion = user;
    })
    .catch((err) => {
      console.log("err1", err.message);
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  for (var i = 0; i < suggestion.length; i++) {
    if (suggestion[i]._id == userId) {
      suggestion.splice(i, 1);
      break;
    }
  }
  response = { friendSuggestion: suggestion, status: 200, output: true };

  return response;
};
