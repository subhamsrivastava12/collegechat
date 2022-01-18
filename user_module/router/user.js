const express = require("express");
const router = express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require("../controller/user");
const {forgotPassword} = require("../controller/forgotpassword");
const {resetPasswordVerification} = require("../controller/resetpasswordverification");
const {resetPassword} = require("../controller/resetpassword");
const {emailVerification}=require("../controller/emailverification");
const {authorization} = require("../utils/authorization");



router.post('/',authorization,getAllUsers);
router.get('/',authorization,getUser);
router.put('/',authorization,updateUser);
router.delete('/',authorization,deleteUser);
router.get('/email_verify/:code',emailVerification);
router.post('/forgot_password',authorization,forgotPassword)
router.get('/forgot_password/:token',authorization,resetPasswordVerification);
router.post('/forgot_password/:token/reset_password',authorization,resetPassword);

module.exports=router;