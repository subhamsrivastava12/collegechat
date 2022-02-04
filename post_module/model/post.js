const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    tags:[{
        type:String,
        default:''
    }],
    image:String,
    image_id:String,
    like:{
        type:Number,
        default:0
    },
    likeId:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    author:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]    


},{timestamps:true});





module.exports = mongoose.model('Post',postSchema);
