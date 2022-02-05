const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {authorization} = require("../../user_module/utils/authorization");
const { createComment } = require("../controller/createcomment");
const {createPost} = require("../controller/createpost");
const { createReply } = require("../controller/createreply");
const { getFeed } = require("../controller/getfeed");
const {getPost} = require("../controller/getpost");
const { getReply } = require("../controller/getreply");
const { sharedFeed } = require("../controller/sharedfeed");
const { deleteComment } = require("../controller/deletecomment");
const { deletePost } = require("../controller/deletepost");
const { like } = require("../controller/like");
const { sharePost } = require("../controller/sharepost");
const { updatePost } = require("../controller/updatepost");
const { getComment } = require("../controller/getcomment");
const { updateComment } = require("../controller/updatecomment");
const { getUserpost } = require("../controller/getuserpost");


//FEED ------------------------------------

//route for getting feed for the user
router.get('/feed/:page',authorization,getFeed);

//route for sharing a post to other user
router.post('/share',authorization,sharePost);

//route for getting posts shared to this user
router.get('/sharefeed/:page',authorization,sharedFeed);



//CRUD FOR POST ----------------------------

//route for creating a new post
router.post('/',authorization,upload.single("image"),createPost);

//route for getting a post with given postid
router.get('/:id',authorization,getPost);

//route for updating the post
router.put('/:id',authorization,upload.single("image"),updatePost);

//route for deleting the post
router.delete('/:id',authorization,deletePost);
// router.get('/',authorization,getUserpost);

//route for getting posts of this user
router.get('/user/:id',authorization,getUserpost);

//route for liking/unliking a post with requested postid
router.get('/:id/like',authorization,like);



//CRUD FOR COMMENTS ------------------------------------


//route for creating cooment on the given post(postid)
router.post('/:id/comment',authorization,createComment);

//route for getting all the comments made to this post(postid)
router.get('/:id/comment/:page',authorization,getComment);

//route for updating a particular comment(commentid)
router.put('/comment/:id',authorization,updateComment);

//route for deleting a particular comment(commentid)
router.delete('/comment/:id',authorization,deleteComment);

//route for replying to a particular comment(commentid)
router.post('/reply/:id',authorization,createReply);

//route for getting replies to this particular comment(commentid)
router.get('/reply/:id/:page',authorization,getReply);


module.exports=router;