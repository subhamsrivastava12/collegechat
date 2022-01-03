const express = require("express");
const router = express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require("../controller/user");
const {forgotPassword} = require("../controller/forgotpassword");
const {resetPasswordVerification} = require("../controller/resetpasswordverification");
const {resetPassword} = require("../controller/resetpassword");
const {emailVerification}=require("../controller/emailverification");
const {authorization} = require("../helper/authorization");



router.get('/',authorization,getAllUsers);
router.get('/:id',authorization,getUser);
router.put('/:id',authorization,updateUser);
router.get('/delete/:id',authorization,deleteUser);
router.get('/email_verify/:code',emailVerification);
router.post('/forgot_password',authorization,forgotPassword)
router.get('/forgot_password/:token',authorization,resetPasswordVerification);
router.post('/forgot_password/:token/reset_password',authorization,resetPassword);

module.exports=router;