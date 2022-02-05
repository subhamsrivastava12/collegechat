const express = require("express");
const router = express.Router();
const {signUp}=require("../controller/signup");
const {login}=require("../controller/login");
const {logout}=require("../controller/logout");


//route for signing up
router.post('/signup',signUp);

//route for logging in
router.post('/login',login);

//route for logout
router.get('/logout',logout);


module.exports=router;