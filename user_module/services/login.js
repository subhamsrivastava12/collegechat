const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.login = async (email, password) => {
  var data = {};
  const token = jwt.sign({ email: email }, process.env.SECRET);
  const response = await User.findOne({
    email: email,
  })
    .then((user) => {
      //console.log("user",user);
      if (!user) {
        data = { message: "user not found", status: 404, output: false };
        //console.log("data",data);
        return data;
      }
      const bool = bcrypt.compareSync(password, user.password);
      //console.log("bool",bool);
      if (!bool) {
        data = { message: "Invalid Credentials", status: 200, output: false };
        //console.log("data",data);
        return data;
      }
      if (!user.email_verified) {
        data = {
          message: "Please verify your email",
          status: 200,
          output: false,
        };
        //console.log("data",data);
        return data;
      }

      data = {
        message: "user login succesfully",
        status: 200,
        token: token,
        userId: user._id,
        username: user.username,
        output: true,
      };
      //console.log("data",data);
      return data;
    })
    .catch((err) => {
      return (data = { message: err.message, status: 500, output: false });
    });
  //console.log("response",response);
  return response;
};
