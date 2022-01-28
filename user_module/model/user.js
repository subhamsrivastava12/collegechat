const mongoose = require('mongoose');
const Post = require("../../post_module/model/post")

const userSchema = mongoose.Schema({
    username:
    {
        type:String,
        unique:true
    },
    email:
    {
        type:String,
        unique:true
    },
    password:
    {
        type:String,
        minlength:8
    },
    email_verified:
    {
        type:Boolean,
        default:false
    },
    confirmationCode:
    {
        type:String,
        unique:true
    },
    resetPasswordtoken:{
        type:String,
        unique:true
    },
    sentRequest:[{
        _id:false,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        username:{type:String, default:''}
        
    }],
    friendRequest:[{
        _id:false,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        username:{type:String, default:''}
    }],
    friendsList:[{
        _id:false,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        username:{type:String, default:''}
    }],
    post:[{    
        type:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
    }],
    sharedpost:[{
        _id:false,
        postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
        sharedBy:{type:String,required:true}
    }],
    

},{timestamps:true});



module.exports = mongoose.model('User',userSchema);