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


//FEED

router.get('/feed/:page',authorization,getFeed);
router.post('/share',authorization,sharePost);
router.get('/sharefeed/:page',authorization,sharedFeed);



//CRUD FOR POST
 
router.post('/',authorization,upload.single("image"),createPost);
router.get('/:id',authorization,getPost);
router.put('/:id',authorization,upload.single("image"),updatePost);
router.delete('/:id',authorization,deletePost);
// router.get('/',authorization,getUserpost);
router.get('/user/:id',authorization,getUserpost);
router.get('/:id/like',authorization,like);



//CRUD FOR COMMENTS

router.post('/:id/comment',authorization,createComment);
router.get('/:id/comment/:page',authorization,getComment);
router.put('/comment/:id',authorization,updateComment);
router.delete('/comment/:id',authorization,deleteComment);
router.post('/reply/:id',authorization,createReply);
router.get('/reply/:id/:page',authorization,getReply);


module.exports=router;