const makeCrud=require("./crudController");
const data=require("../data/suppliersData");
module.exports=makeCrud({data,label:"Supplier"});
