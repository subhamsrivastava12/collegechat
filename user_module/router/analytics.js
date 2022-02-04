const express = require("express");
const router = express.Router();
const {authorization} = require("../utils/authorization");

const { getTagsanalytics } = require("../controller/gettagsanalytics");


router.get('/tags',authorization,getTagsanalytics);

module.exports=router;