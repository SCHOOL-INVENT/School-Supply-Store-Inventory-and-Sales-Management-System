let customers = [
  { id: 1, name: "Juan Dela Cruz", contact: "09171234567", email: "juan@example.com", address: "Cebu City" },
  { id: 2, name: "Mary Santos", contact: "09181234567", email: "mary@example.com", address: "Mandaue City" }
];
let nextId = 3;
function clone(v){ return v == null ? v : JSON.parse(JSON.stringify(v)); }
function findAll(){ return clone(customers); }
function findById(id){ return clone(customers.find(x=>x.id===Number(id))||null); }
function save(item){ const x={...item,id:nextId++}; customers.push(x); return clone(x); }
function updateById(id, changes){ const i=customers.findIndex(x=>x.id===Number(id)); if(i<0)return null; customers[i]={...customers[i],...changes}; return clone(customers[i]); }
function deleteById(id){ const i=customers.findIndex(x=>x.id===Number(id)); if(i<0)return null; return clone(customers.splice(i,1)[0]); }
function clearForTests(){customers=[];nextId=1;}
module.exports={findAll,findById,save,updateById,deleteById,clearForTests};
