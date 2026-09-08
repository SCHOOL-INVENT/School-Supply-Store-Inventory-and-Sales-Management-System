const data = require("../data/productsData");
function recalcStatus(item){if(item.quantity===0)return "out-of-stock";if(item.quantity<=10)return "low-stock";return "in-stock";}
function getAllProducts(req,res){return res.status(200).json({status:200,data:data.findAll(),error:null});}
function getProductById(req,res){const item=data.findById(req.params.id);if(!item)return res.status(404).json({status:404,data:null,error:"Product not found",field:"id"});return res.status(200).json({status:200,data:item,error:null});}
function createProduct(req,res){const item=data.save({...req.validatedBody,status:recalcStatus(req.validatedBody)});return res.status(201).json({status:201,data:item,error:null});}
function updateProduct(req,res){const old=data.findById(req.params.id);if(!old)return res.status(404).json({status:404,data:null,error:"Product not found",field:"id"});const merged={...old,...req.validatedBody};merged.status=recalcStatus(merged);const item=data.updateById(req.params.id,merged);return res.status(200).json({status:200,data:item,error:null});}
function deleteProduct(req,res){const item=data.deleteById(req.params.id);if(!item)return res.status(404).json({status:404,data:null,error:"Product not found",field:"id"});return res.status(200).json({status:200,data:{message:"Product deleted successfully",item},error:null});}
function searchProducts(req,res){return res.status(200).json({status:200,data:data.search(req.query.q),error:null});}
function getLowStock(req,res){const threshold=req.query.threshold===undefined?10:Number(req.query.threshold);if(!Number.isFinite(threshold)||threshold<0)return res.status(422).json({status:422,data:null,error:"threshold must be a non-negative number",field:"threshold"});return res.status(200).json({status:200,data:data.lowStock(threshold),error:null});}
module.exports={getAllProducts,getProductById,createProduct,updateProduct,deleteProduct,searchProducts,getLowStock};
