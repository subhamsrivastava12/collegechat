const express = require("express");
const router = express.Router();
const {authorization} = require("../../user_module/utils/authorization");
const {getFriendslist} = require("../controller/friendslist");
const {cancelRequest} = require("../controller/cancelrequest");
const {getFriendrequest} = require("../controller/friendrequest");
const {getFriendsuggestion} = require("../controller/friendsuggestion");
const {rejectRequest} = require("../controller/rejectrequest");
const {sendRequest} = require("../controller/sendrequest");
const {acceptRequest} = require("../controller/acceptrequest");

//route for getting friendlist of the user
router.get('/',authorization,getFriendslist);

//route for getting friend reuests
router.get('/request',authorization,getFriendrequest);

//route for sending friend request to a user
router.post('/request',authorization,sendRequest);

//route for accepting friend request of other user
router.post('/accept',authorization,acceptRequest);

//route for rejecting friend request of other user
router.post('/reject',authorization,rejectRequest);

//route for canceling a already sent friend request
router.post('/cancel',authorization,cancelRequest);

//route for getting friend suggestions
router.get('/suggestion',authorization,getFriendsuggestion);



module.exports=router;