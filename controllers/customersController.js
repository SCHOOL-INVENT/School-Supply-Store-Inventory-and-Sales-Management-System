const makeCrud=require("./crudController");
const data=require("../data/customersData");
module.exports=makeCrud({data,label:"Customer"});
