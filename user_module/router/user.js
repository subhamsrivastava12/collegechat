const express = require("express");
const router = express.Router();
const {getAllUsers,getUser,updateUser}=require("../controller/user");


router.get('/',getAllUsers);
router.get('/:id',getUser);
router.put('/:id',updateUser);

module.exports=router;