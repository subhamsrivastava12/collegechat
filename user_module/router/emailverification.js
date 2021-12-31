const express = require("express");
const router = express.Router();
const {emailVerification}=require("../controller/verificationcontroller");



router.get('/email_verify/:code',emailVerification);


module.exports=router;