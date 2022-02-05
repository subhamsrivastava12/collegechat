const express = require("express");
const router = express.Router();
const {authorization} = require("../utils/authorization");

const { getTagsanalytics } = require("../controller/gettagsanalytics");

//route for analysing most liked tags for the user.More analytics can be added here//
router.get('/tags',authorization,getTagsanalytics);

module.exports=router;