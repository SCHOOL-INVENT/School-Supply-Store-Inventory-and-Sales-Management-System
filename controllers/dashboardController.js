const products=require("../data/productsData");
const sales=require("../data/salesData");

async function dashboard(req,res){
  const [productRows,saleRows]=await Promise.all([products.findAll(),sales.findAll()]);
  return res.status(200).json({status:200,data:{
    totalProducts:productRows.length,
    totalSales:Number(saleRows.reduce((n,x)=>n+x.total,0).toFixed(2)),
    lowStockItems:productRows.filter(x=>x.quantity<=10).length,
    totalTransactions:saleRows.length,
    recentSales:saleRows.slice(-5).reverse()
  },error:null});
}
module.exports={dashboard};
