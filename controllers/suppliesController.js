const products = require("./productsController");
const data = require("../data/suppliesData");
function createSupply(req,res){return products.createProduct(req,res);}
function getAllSupplies(req,res){return products.getAllProducts(req,res);}
function getSupplyById(req,res){return products.getProductById(req,res);}
function updateSupply(req,res){return products.updateProduct(req,res);}
function deleteSupply(req,res){const item=data.deleteById(req.params.id);if(!item)return res.status(404).json({status:404,data:null,error:"Supply item not found",field:"id"});return res.status(200).json({status:200,data:{message:"Supply item deleted successfully",item},error:null});}
function searchSupplies(req,res){return products.searchProducts(req,res);}
function getLowStock(req,res){return products.getLowStock(req,res);}
module.exports={createSupply,getAllSupplies,getSupplyById,updateSupply,deleteSupply,searchSupplies,getLowStock,data};
