const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const helper = require("../helper/emailverification");
const { createUser } = require("../helper/signup");
dotenv.config();


module.exports.signUp = async (username, email, password) => {
    var data = {};
    var bool = false;
    var user = {};
    var newuser = {};
    const confirmationCode = jwt.sign({ email: email }, process.env.SECRET);


    const response = await User.findOne({ $or: [{ email: email }, { username: username }] })
        .then((user) => {
            console.log("user", user);
            user = user;
            if (!user) {

                newuser = createUser(username, email, password, confirmationCode);
                newuser.save((err) => {
                    if (err) {
                        bool = true;
                        console.log("1 error");
                        data = { message: err.message, status: 500, output: false };
                        return data;

                    }


                });

            }
        })
    if (bool) {
        return response;
    }
    if (!user) {
        bool = true;
        const response1 = await helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode)
            .then((val) => {
                console.log("val", val);
                return val;
            })
            .catch((err) => {
                data = { message: err.message, status: 500, output: false };
                return data;
            })

        return response1;
    }



    const verified = Boolean(user.email_verified);
    var response2 = {};

    if (verified) {
        bool = true;
        data = { message: "Email Id is already in use", status: 200, output: false };
        response2 = data;
    }

    if (bool) {
        return response2;
    }

    User.findByIdAndUpdate({ "_id": user._id }, newuser);

    response2 = await helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode)
        .then((val) => {
            console.log("val", val);
            return val;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };
            return data;
        })

    return response2;



}
