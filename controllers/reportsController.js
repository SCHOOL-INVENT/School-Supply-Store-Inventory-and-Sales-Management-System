const products=require("../data/productsData");const sales=require("../data/salesData");
function inventoryReport(req,res){return res.status(200).json({status:200,data:{generatedAt:new Date().toISOString(),totalProducts:products.findAll().length,items:products.findAll()},error:null});}
function salesReport(req,res){const all=sales.findAll();return res.status(200).json({status:200,data:{generatedAt:new Date().toISOString(),transactionCount:all.length,totalSales:Number(all.reduce((n,x)=>n+x.total,0).toFixed(2)),transactions:all},error:null});}
function lowStockReport(req,res){const threshold=req.query.threshold===undefined?10:Number(req.query.threshold);if(!Number.isFinite(threshold)||threshold<0)return res.status(422).json({status:422,data:null,error:"threshold must be a non-negative number",field:"threshold"});return res.status(200).json({status:200,data:{threshold,items:products.findAll().filter(x=>x.quantity<=threshold)},error:null});}
function transactionHistory(req,res){return salesReport(req,res);}
module.exports={inventoryReport,salesReport,lowStockReport,transactionHistory};
