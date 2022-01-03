const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const helper = require("../helper/emailverification");
const { createUser } = require("../helper/signup");
dotenv.config();


module.exports.signUp = async (username, email, password) => {
    const confirmationCode = jwt.sign({ email: email }, process.env.SECRET);


    await User.findOne({$or: [{email: email},{username: username}]})
    .then((user)=>{
        console.log("user",user);
        if(!user){
            
            const newuser = createUser(username, email, password, confirmationCode);
            newuser.save((err) => {
                if (err) {
                    console.log("1 error");
                    const data = { message: err.message, status: 500, output: false };
                    return data;

                }

                return helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode);

            });

        }
        else{
            const verified=Boolean(user.email_verified);
            
            if(verified){

                
                const data = { message: "Email Id is already in use", status: 200, output: false };
                return data;
    
            }
            else{    

                const newuser = createUser(username, email, password, confirmationCode);
                User.findByIdAndUpdate({ "_id": user._id }, newuser, function (err, user) {
                    if (err) {
                        console.log("2 error");
                        const data = { message: err.message, status: 500, output: false };
                        return data;
                    }
                    return helper.sendMail(newuser.username, newuser.email, newuser.confirmationCode);
                });
            }
        }
    })
    .catch((err)=>{
        const data = { message: err.message, status: 500, output: false };
        return data;
    })
    

    

    
}
