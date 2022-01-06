const User = require('../model/user');
const helper = require("../helper/emailverification");
const jwt = require("jsonwebtoken");


module.exports.getAllUser= async (string)=>{
    var data={};
    const response =await User.find({"username": {$regex : `^${string}.*` , $options: 'si' }},{limit:10})
    .then((users)=>{
        data={users:users,status:200,output:true};
        console.log(data);
        return data;
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })
        
    return response;
}

module.exports.getUser=async (id)=>{
    var data={};
    const response=await User.find({"_id":id})
    .then((user)=>{
        data={user:user,status:200,output:true};
        return data;
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })
    
    return response;
}

module.exports.updateUser= async (id,email,updatedValue)=>{
    var data={};
    var response={};
    var user={};
    const confirmationCode = jwt.sign({ email: email }, process.env.SECRET);
    updatedValue.confirmationCode=confirmationCode;
    User.findByIdAndUpdate({"_id":id},updatedValue,function(err,user){
        if(err){
            data={message:err.message,status:500,output:false};
            response=data;
            return response;
        }
        user=user;
    });
    response = await helper.sendMail(user.username, user.email, user.confirmationCode)
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

module.exports.deleteUser= async (id)=>{
    var data={};
    const response=await User.remove({"_id":id})
    .then((user)=>{
        data={message:"user deleted successfully",status:200,output:true};
        return data;
    })
    .catch((err)=>{
        data={message:err.message,status:500,output:false}
        return data;
    })

    return response;
    
    
}