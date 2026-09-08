let sales=[];
let nextId=1;
function clone(v){return v==null?v:JSON.parse(JSON.stringify(v));}
function findAll(){return clone(sales);}
function findById(id){return clone(sales.find(x=>x.id===Number(id))||null);}
function save(item){const x={...item,id:nextId++};sales.push(x);return clone(x);}
function updateById(id,changes){const i=sales.findIndex(x=>x.id===Number(id));if(i<0)return null;sales[i]={...sales[i],...changes};return clone(sales[i]);}
function deleteById(id){const i=sales.findIndex(x=>x.id===Number(id));if(i<0)return null;return clone(sales.splice(i,1)[0]);}
function clearForTests(){sales=[];nextId=1;}
module.exports={findAll,findById,save,updateById,deleteById,clearForTests};
