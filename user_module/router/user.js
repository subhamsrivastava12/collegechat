const express = require("express");
const router = express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require("../controller/user");
const {forgotPassword} = require("../controller/forgotpassword");
const {resetPasswordVerification} = require("../controller/resetpasswordverification");
const {resetPassword} = require("../controller/resetpassword");
const {emailVerification}=require("../controller/emailverification");
const {authorization} = require("../utils/authorization");
const { getUserprofile } = require("../controller/getuserprofile");


//route for searching a user 
router.post('/',authorization,getAllUsers);

/*route for getting user detail , not needed get user profile route 
will do the same thing */
router.get('/',authorization,getUser);

//route for getting user details with given id
router.get('/:id',authorization,getUserprofile);

//route for updating user details after signup
router.put('/',authorization,updateUser);

//route for deleting user
router.delete('/',authorization,deleteUser);

//route for email verification, required for account activation
router.get('/email_verify/:code',emailVerification);

/*route for requesting forgot password which will generate unique
code for password resetting*/
router.post('/forgot_password',authorization,forgotPassword)

//route for verifying the forgot password generated unique code
router.get('/forgot_password/:token',authorization,resetPasswordVerification);

//route for changing password
router.post('/forgot_password/:token/reset-password',authorization,resetPassword);

module.exports=router;