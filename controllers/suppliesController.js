const products = require("./productsController");
async function createSupply(req,res){return products.createProduct(req,res);}
async function getAllSupplies(req,res){return products.getAllProducts(req,res);}
async function getSupplyById(req,res){return products.getProductById(req,res);}
async function updateSupply(req,res){return products.updateProduct(req,res);}
async function deleteSupply(req,res){return products.deleteProduct(req,res);}
async function searchSupplies(req,res){return products.searchProducts(req,res);}
async function getLowStock(req,res){return products.getLowStock(req,res);}
module.exports={createSupply,getAllSupplies,getSupplyById,updateSupply,deleteSupply,searchSupplies,getLowStock};
