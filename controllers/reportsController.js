const products=require("../data/productsData");
const sales=require("../data/salesData");
async function inventoryReport(req,res){const items=await products.findAll();return res.status(200).json({status:200,data:{generatedAt:new Date().toISOString(),totalProducts:items.length,items},error:null});}
async function salesReport(req,res){const transactions=await sales.findAll();return res.status(200).json({status:200,data:{generatedAt:new Date().toISOString(),transactionCount:transactions.length,totalSales:Number(transactions.reduce((n,x)=>n+x.total,0).toFixed(2)),transactions},error:null});}
async function lowStockReport(req,res){const threshold=req.query.threshold===undefined?10:Number(req.query.threshold);if(!Number.isFinite(threshold)||threshold<0)return res.status(422).json({status:422,data:null,error:"threshold must be a non-negative number",field:"threshold"});return res.status(200).json({status:200,data:{threshold,items:await products.lowStock(threshold)},error:null});}
async function transactionHistory(req,res){return salesReport(req,res);}
module.exports={inventoryReport,salesReport,lowStockReport,transactionHistory};
