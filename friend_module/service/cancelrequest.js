const User = require("../../user_module/model/user");

module.exports.cancelRequest = async (senderId, receiverId) => {
  var data = {};
  var sender = {};
  var receiver = {};
  var bool = true;
  var response = {};
  var updatedsender={};
  response = await User.find({ _id: senderId })
    .then((user) => {
      sender = user;
    })
    .catch((err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }

  for (var i = 0; i < sender[0].sentRequest.length; i++) {
    if (sender[0].sentRequest[i].userId == receiverId) {
      sender[0].sentRequest.splice(i, 1);
      break;
    }
  }

  response = await User.findByIdAndUpdate({ _id: senderId }, sender[0]).catch(
    (err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    }
  );

  if (!bool) {
    return response;
  }

  response = await User.find({ _id: receiverId })
    .then((user) => {
      receiver = user;
    })
    .catch((err) => {
      bool = false;
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  if (!bool) {
    return response;
  }

  for (var i = 0; i < receiver[0].friendRequest.length; i++) {
    console.log();
    if (receiver[0].friendRequest[i].userId == senderId) {
      receiver[0].friendRequest.splice(i, 1);
      break;
    }
  }

  response = await User.findByIdAndUpdate(
    { _id: receiverId },
    receiver[0]
  ).catch((err) => {
    bool = false;
    data = { message: err.message, status: 500, output: false };
    return data;
  });

  if (!bool) {
    return response;
  }

  response = {
    message: "You have unsent your friend request",
    data:sender[0],
    status: 200,
    output: true,
  };
  return response;
};
