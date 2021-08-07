const router=require("express").Router();
const { authenticated } = require("../../validators/auth.js");
const getData=require("./userData");

router.get("/", authenticated, getData);

module.exports=router;