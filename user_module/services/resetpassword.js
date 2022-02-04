const dotenv = require("dotenv");
const User = require("../model/user");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports.resetPassword = async (token, email, password) => {
  var data = {};
  var bool = false;
  var user1 = {};
  var response = await User.findOne({
    email: email,
    resetPasswordtoken: token,
  }).then((user) => {
    //console.log(user);
    user1 = user;
    if (!user) {
      bool = true;
      return (data = {
        message: "user not found",
        status: 404,
        output: false,
      });
    }
    if (!user.email_verified) {
      bool = true;
      return (data = {
        message: "verify your email id first",
        status: 200,
        output: false,
      });
    }
  });

  if (bool) {
    return response;
  }

  const hashed = bcrypt.hashSync(password, 10);
  console.log("user1", user1);
  response = await User.findByIdAndUpdate(
    { _id: user1._id },
    { password: hashed }
  )
    .then((val) => {
      data = {
        message: "Password updated successfully",
        status: 200,
        output: true,
      };
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("error");
      const data = { message: err.message, status: 500, output: false };
      return data;
    });

  return response;
};
