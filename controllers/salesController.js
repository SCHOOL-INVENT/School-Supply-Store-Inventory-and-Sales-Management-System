const salesData=require("../data/salesData");
const products=require("../data/productsData");
const customers=require("../data/customersData");
function error(res,status,message,field=null){return res.status(status).json({status,data:null,error:message,field});}
function calculate(items){return items.map(i=>{const p=products.findById(i.productId);return {...i,name:p.name,unitPrice:p.unitPrice,lineTotal:Number((p.unitPrice*i.quantity).toFixed(2))};})}
function buildSale(body){
  if(body.customerId!==undefined&&!customers.findById(body.customerId))return {error:[404,"Customer not found","customerId"]};
  const items=[];for(const input of body.items){const p=products.findById(input.productId);if(!p)return {error:[404,"Product not found","items"]};if(p.quantity<input.quantity)return {error:[422,`Insufficient stock for ${p.name}`,"items"]};items.push({productId:p.id,name:p.name,quantity:input.quantity,unitPrice:p.unitPrice,lineTotal:Number((p.unitPrice*input.quantity).toFixed(2))});}
  const total=Number(items.reduce((s,i)=>s+i.lineTotal,0).toFixed(2));return {sale:{customerId:body.customerId||null,items,total,transactionDate:body.transactionDate||new Date().toISOString()}};
}
function createSale(req,res){const built=buildSale(req.validatedBody||req.body);if(built.error)return error(res,...built.error);for(const item of built.sale.items){const p=products.findById(item.productId);const quantity=p.quantity-item.quantity;products.updateById(p.id,{quantity,status:quantity===0?"out-of-stock":quantity<=10?"low-stock":"in-stock"});}const sale=salesData.save(built.sale);return res.status(201).json({status:201,data:sale,error:null});}
function listSales(req,res){return res.status(200).json({status:200,data:salesData.findAll(),error:null});}
function getSale(req,res){const s=salesData.findById(req.params.id);if(!s)return error(res,404,"Sale not found","id");return res.status(200).json({status:200,data:s,error:null});}
function updateSale(req,res){const old=salesData.findById(req.params.id);if(!old)return error(res,404,"Sale not found","id");
  // restore old quantities before validating replacement
  for(const item of old.items){const p=products.findById(item.productId);if(p)products.updateById(p.id,{quantity:p.quantity+item.quantity,status:(p.quantity+item.quantity)<=0?"out-of-stock":(p.quantity+item.quantity)<=10?"low-stock":"in-stock"});}
  const built=buildSale(req.validatedBody||req.body);if(built.error){for(const item of old.items){const p=products.findById(item.productId);if(p)products.updateById(p.id,{quantity:p.quantity-item.quantity,status:(p.quantity-item.quantity)<=0?"out-of-stock":(p.quantity-item.quantity)<=10?"low-stock":"in-stock"});}return error(res,...built.error);}
  for(const item of built.sale.items){const p=products.findById(item.productId);const q=p.quantity-item.quantity;products.updateById(p.id,{quantity:q,status:q===0?"out-of-stock":q<=10?"low-stock":"in-stock"});}
  const sale=salesData.updateById(req.params.id,built.sale);return res.status(200).json({status:200,data:sale,error:null});
}
function deleteSale(req,res){const old=salesData.findById(req.params.id);if(!old)return error(res,404,"Sale not found","id");for(const item of old.items){const p=products.findById(item.productId);if(p){const q=p.quantity+item.quantity;products.updateById(p.id,{quantity:q,status:q===0?"out-of-stock":q<=10?"low-stock":"in-stock"});}}const sale=salesData.deleteById(req.params.id);return res.status(200).json({status:200,data:{message:"Sale deleted successfully",item:sale},error:null});}
module.exports={createSale,listSales,getSale,updateSale,deleteSale};
