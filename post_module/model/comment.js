const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    text:{type:String,required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    reply:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]

},{timestamps:true});





module.exports = mongoose.model('Comment',commentSchema);