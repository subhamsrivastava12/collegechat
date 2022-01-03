const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (username,email,password,confirmationCode)=>{


    const newuser = new User({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,10),
        confirmationCode: confirmationCode

    });

    return newuser;

}