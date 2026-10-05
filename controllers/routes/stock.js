const express=require("express");
const router=express.Router();
const c=require("../stockController");
const {authenticate}=require("../../middleware/auth");

router.post("/in",authenticate,c.stockIn);
router.post("/out",authenticate,c.stockOut);
router.get("/transactions",authenticate,c.listTransactions);

module.exports=router;
