const Post = require("../model/post");
const User = require("../../user_module/model/user");
const dotenv = require("dotenv");
const cloudinary = require("../utils/cloudinary");
dotenv.config();


module.exports.createPost = async (req, res) => {
    var data = {};
    var response = {};
    var post1 = {};
    var user1 = {};
    var bool = true;
    var userId = req.cookies.userId;
    console.log("req", req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("result", result);
    var post = new Post({
        caption: req.body.caption,
        description: req.body.description,
        image: result.secure_url,
        image_id: result.public_id,
        author: req.cookies.username,
        userId: userId
    });



    response = await post.save()
        .then((post) => {
            post1 = post;
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false };
            return data;
        })
    if (!bool) {
        return response;
    }
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
    console.log("post", post1._id);
    console.log("user", user1);
    user1.post.unshift(post);
    response = await User.findByIdAndUpdate({ "_id": userId }, user1)
        .then(() => {
            data = { message: "post created successfully", status: 200, output: true };
            return data;
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false }
            return data;
        });



    return response;


}
