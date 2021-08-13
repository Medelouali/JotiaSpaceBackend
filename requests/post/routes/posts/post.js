const router=require("express").Router();
const saveIt=require("./saveIt/saveIt.js");

router.post("/saveIt", saveIt);