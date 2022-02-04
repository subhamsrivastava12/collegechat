const User = require("../../user_module/model/user");

module.exports.getRequest = async (userId) => {
  var data = {};
  var response = {};
  response = await User.find({ _id: userId })
    .then((user) => {
      console.log("list", user[0].friendRequest);
      data = {
        friendRequest: user[0].friendRequest,
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
