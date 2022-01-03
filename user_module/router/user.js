const express = require("express");
const router = express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require("../controller/user");
const {forgotPassword} = require("../controller/forgotpassword");
const {resetPasswordVerification} = require("../controller/resetpasswordverification");
const {resetPassword} = require("../controller/resetpassword");
const {emailVerification}=require("../controller/emailverification");




router.get('/',getAllUsers);
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.get('/delete/:id',deleteUser);
router.get('/email_verify/:code',emailVerification);
router.post('/forgot_password',forgotPassword)
router.get('/forgot_password/:token',resetPasswordVerification);
router.post('/forgot_password/:token/reset_password',resetPassword);

module.exports=router;