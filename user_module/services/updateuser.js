const User = require('../model/user');
const helper = require("../utils/emailverification");
const jwt = require("jsonwebtoken");



module.exports.updateUser = async (id, email, updatedValue) => {
    var data = {};
    var response = {};
    var user1 = {};
    if(email){
        const confirmationCode = jwt.sign({ email: email }, process.env.SECRET);
        updatedValue.confirmationCode = confirmationCode;
    }
    response = await User.findByIdAndUpdate({ "_id": id }, updatedValue)
        .then((user)=>{
            user1 = user;
            data = { message: "data updated successfuly", data:user1, status: 200, output: true };
            return data;
        })
        .catch((err)=>{
            data = { message: err.message, status: 500, output: false };
            return data;
        })
        
    if(email){
    response = await helper.sendMail(user1.username, user1.email, user1.confirmationCode)
        .then((val) => {
            console.log("val", val);
            data=val;
            data["data"]=user1;
            return val;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };
            return data;
        })
    }

    return response;
}