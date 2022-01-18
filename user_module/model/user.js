const mongoose = require('mongoose');


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
    }]

},{timestamps:true});



module.exports = mongoose.model('User',userSchema);