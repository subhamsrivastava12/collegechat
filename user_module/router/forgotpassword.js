const express = require("express");
const router = express.Router();
const {forgotPassword} = require("../controller/forgotpassword");
const {resetPasswordVerification} = require("../controller/resetpasswordverification");
const {resetPassword} = require("../controller/resetpassword");





router.post('/forgot_password',forgotPassword)
router.get('/forgot_password/:token',resetPasswordVerification);
router.post('/reset_password',resetPassword);

module.exports=router;
