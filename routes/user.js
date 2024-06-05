const express=require("express");
const router=express.Router();
const {userHandleSignup,userHandleLogin} =require("../controller/user")

router.post('/',userHandleSignup)
router.post("/login",userHandleLogin);

module.exports=router;