const User = require("../../user_module/model/user");

module.exports.getFriendslist = async (userId) => {
  var data = {};
  var response = {};
  response = await User.find({ _id: userId })
    .then((user) => {
      data = { message:"user's friendlist",data: user[0].friendsList, status: 200, output: true };
      return data;
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  return response;
};
