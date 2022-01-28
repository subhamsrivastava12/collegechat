const Post = require("../model/post");
const User = require("../../user_module/model/user");
const dotenv = require("dotenv");
const cloudinary = require("../utils/cloudinary");
dotenv.config();


module.exports.deletePost = async (postId, userId) => {
    var data = {};
    var response = {};
    var bool = true;
    var postdata = {};
    var user1 = {};

    response = await Post.find({ "_id": postId })
        .then((post) => {
            postdata = post[0];
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false };
            return data;
        })
    if (!bool) {
        return response;
    }
    //console.log("postdata",postdata);
    response = await User.find({ "_id": userId })
        .then((user) => {
            user1 = user[0];
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false };
            return data;
        })
    if (!bool) {
        return response;
    }

    for (var i = 0; i < user1.post.length; i++) {
        if (user1.post[i]._id == postId) {
            console.log("user post", user1.post[i]);
            user1.post.splice(i, 1);
            break;
        }
    }
    response = await User.findByIdAndUpdate({ _id: userId }, user1)
        .catch(
            (err) => {
                bool = false;
                data = { message: err.message, status: 500, output: false };
                return data;
            }
        );

    if (!bool) {
        return response;
    }
    response = await cloudinary.uploader.destroy(postdata.image_id)
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false };

            return data;
        })
    if (!bool) {
        return response;
    }
    response = await cloudinary.uploader.destroy(postdata.image_id)
        .then((val) => {
            bool = true;
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false };

            return data;
        })
    if (!bool) {
        return response;
    }

    response = await Post.findOneAndRemove({ "_id": postId })
        .then((val) => {
            data = { message: "post deleted successfully", status: 200, output: true };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        })



    return response;
}
