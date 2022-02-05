const User = require("../model/user");
const Post = require("../../post_module/model/post");

module.exports.getTagsanalytics = async (userId) => {
  var data = {};
  var user1 = {};
  var response = {};
  var tags = {};
  var tag = [];
  console.log("_id", userId);

  response = await User.find({ _id: userId }, { likedpost: 1 })
    //.populate('likedpost')
    .then((user) => {
      user1 = user[0];
      console.log("useranalytics", user1);
    })
    .catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });

  for (var i = 0; i < user1.likedpost.length; i++) {
    var curtags = await Post.findOne(
      { _id: user1.likedpost[i]._id },
      { tags: 1 }
    ).catch((err) => {
      data = { message: err.message, status: 500, output: false };
      return data;
    });
    tag.push(...curtags.tags);
  }
  for (var j = 0; j < tag.length; j++) {
    if (tags[tag[j]] != null) {
      tags[tag[j]]++;
    } else {
      tags[tag[j]] = 1;
    }
  }

  console.log("tag", tags);

  response = { message:"most liked tags",data: tags, status: 200, output: true };

  return response;
};
