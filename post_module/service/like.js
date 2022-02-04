const User = require("../../user_module/model/user");
const Post = require("../model/post");

module.exports.like = async (postId, likeId) => {
    var response = {};
    var data = {};
    var post1 = {};
    var user1 = {};
    var bool = true;
    response = await Post.find({ _id: postId })
        .then((post) => {
            console.log("post", post);
            post1 = post[0];
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };
            return data;
        });
    for (var i = 0; i < post1.likeId.length; i++) {
        if (post1.likeId[i] == likeId) {
            post1.likeId.splice(i, 1);
            post1.like--;
            bool = false;
            break;
        }
    }
    if (bool) {
        post1.likeId.push(likeId);
        post1.like++;
    }

    response = await User.find({ _id: likeId })
        .then((user) => {
            console.log("user", user[0]);
            user1 = user[0];
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };
            return data;
        });

    for (var i = 0; i < user1.likedpost.length; i++) {
        if (user1.likedpost[i]._id == postId) {
            user1.likedpost.splice(i, 1);
            bool = false;
            break;
        }
    }

    if (bool) {
        user1.likedpost.push(postId);
    }

    response = await User.findByIdAndUpdate({ _id: likeId }, user1).catch(
        (err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        }
    );

    response = await Post.findByIdAndUpdate({ _id: postId }, post1)
        .then((val) => {
            data = {
                message: "Like operation performed successfully",
                status: 200,
                output: true,
            };

            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false };

            return data;
        });

    return response;
};
