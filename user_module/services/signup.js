const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const helper = require("../helper/emailverification");
const { createUser,updateUser } = require("../helper/signup");
dotenv.config();


module.exports.signUp = async (username, email, password) => {
    var data = {};
    var bool = false;
    var user1 = {};
    var newuser = {};
    var response={};
    const confirmationCode = jwt.sign({ email: email }, process.env.SECRET);


    response = await User.findOne({ $or: [{ email: email }, { username: username }] })
        .then((user) => {
            console.log("user", user);
            user1 = user;
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
    console.log("usercheck",user1);
    if (!user1) {
        bool = true;
        response = await helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode)
            .then((val) => {
                console.log("val", val);
                return val;
            })
            .catch((err) => {
                data = { message: err.message, status: 500, output: false };
                return data;
            })

        return response;
    }



    const verified = Boolean(user1.email_verified);
    var response2 = {};

    if (verified) {
        bool = true;
        data = { message: "Email Id is already in use", status: 200, output: false };
        response = data;
    }

    if (bool) {
        return response;
    }

    if(!bool){
        newuser = updateUser(username, email, password, confirmationCode);
        console.log("newuser",newuser);
        User.findByIdAndUpdate({"_id":user1._id},newuser,function(err,user){
            if(err){
                data={message:err.message,status:500,output:false};
                response=data;
                return response;
            }
            
        });

        response = await helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode)
            .then((val) => {
                console.log("val", val);
                return val;
            })
            .catch((err) => {
                data = { message: err.message, status: 500, output: false };
                return data;
            })

        return response;
    }


}
