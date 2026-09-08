let suppliers = [
  { id: 1, name: "ABC School Supplies", contact: "09190000001", email: "abc@example.com", address: "Cebu City" },
  { id: 2, name: "Learning Materials Co.", contact: "09190000002", email: "learning@example.com", address: "Mandaue City" }
];
let nextId = 3;
function clone(v){ return v == null ? v : JSON.parse(JSON.stringify(v)); }
function findAll(){ return clone(suppliers); }
function findById(id){ return clone(suppliers.find(x=>x.id===Number(id))||null); }
function save(item){ const x={...item,id:nextId++}; suppliers.push(x); return clone(x); }
function updateById(id, changes){ const i=suppliers.findIndex(x=>x.id===Number(id)); if(i<0)return null; suppliers[i]={...suppliers[i],...changes}; return clone(suppliers[i]); }
function deleteById(id){ const i=suppliers.findIndex(x=>x.id===Number(id)); if(i<0)return null; return clone(suppliers.splice(i,1)[0]); }
function clearForTests(){suppliers=[];nextId=1;}
module.exports={findAll,findById,save,updateById,deleteById,clearForTests};
