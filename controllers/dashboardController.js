const products=require("../data/productsData");const sales=require("../data/salesData");
function dashboard(req,res){const p=products.findAll(),s=sales.findAll();return res.status(200).json({status:200,data:{totalProducts:p.length,totalSales:s.reduce((n,x)=>n+x.total,0),lowStockItems:p.filter(x=>x.quantity<=10).length,totalTransactions:s.length,recentSales:s.slice(-5).reverse()},error:null});}
module.exports={dashboard};
