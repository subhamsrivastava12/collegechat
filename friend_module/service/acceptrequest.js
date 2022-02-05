const User = require("../../user_module/model/user");
const { sendMail } = require("../utils/friendnotification");

module.exports.acceptRequest = async (
  senderId,
  senderName,
  receiverId,
  receiverName
) => {
  var data = {};
  var sender = {};
  var receiver = {};
  var bool = true;
  var response = {};
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
  var Friend1 = {
    userId: receiverId,
    username: receiverName,
  };
  sender[0].friendsList.push(Friend1);
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

  var Friend2 = {
    userId: senderId,
    username: senderName,
  };

  receiver[0].friendsList.push(Friend2);
  for (var i = 0; i < receiver[0].friendRequest.length; i++) {
    if (receiver[0].friendRequest[i].userId == senderId) {
      receiver[0].friendRequest.splice(i, 1);
      break;
    }
  }
  response = await User.findByIdAndUpdate(
    { _id: receiverId },
    receiver[0]
  )
  .catch((err) => {
    bool = false;
    data = { message: err.message, status: 500, output: false };
    return data;
  });
  if (!bool) {
    return response;
  }

  if (sender[0].notification) {
    response = await sendMail(senderName, sender[0].email, receiverName)
      .then((val) => {
        data=val;
        data["data"]=receiver[0];
        return data;
      })
      .catch((err) => {
        data = { message: err.message, status: 500, output: false };
        return data;
      });
  }

  return response;
};
