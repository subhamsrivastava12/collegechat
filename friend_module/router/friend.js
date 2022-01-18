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


router.get('/',authorization,getFriendslist);
router.get('/request',authorization,getFriendrequest);
router.post('/request',authorization,sendRequest);
router.post('/accept',authorization,acceptRequest);
router.post('/reject',authorization,rejectRequest);
router.post('/cancel',authorization,cancelRequest);
router.get('/suggestion',authorization,getFriendsuggestion);



module.exports=router;