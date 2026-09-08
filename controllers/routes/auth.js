const express=require("express");const router=express.Router();const c=require("../authController");router.post("/login",c.loginUser);module.exports=router;
