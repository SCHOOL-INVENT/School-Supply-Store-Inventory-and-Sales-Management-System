const {db}=require("./database");
const map=r=>r&&({id:r.id,name:r.name,contact:r.contact,email:r.email,address:r.address});
const findAll=()=>db.prepare("SELECT * FROM suppliers ORDER BY id").all().map(map);
const findById=id=>map(db.prepare("SELECT * FROM suppliers WHERE id=?").get(Number(id)));
const save=x=>{const r=db.prepare("INSERT INTO suppliers(name,contact,email,address) VALUES(?,?,?,?)").run(x.name,x.contact,x.email??null,x.address??null);return findById(r.lastInsertRowid);};
const updateById=(id,c)=>{if(!findById(id))return null;db.prepare("UPDATE suppliers SET name=?,contact=?,email=?,address=? WHERE id=?").run(c.name,c.contact,c.email??null,c.address??null,Number(id));return findById(id);};
const deleteById=id=>{const x=findById(id);if(!x)return null;db.prepare("DELETE FROM suppliers WHERE id=?").run(Number(id));return x;};
const clearForTests=()=>db.prepare("DELETE FROM suppliers").run();
module.exports={findAll,findById,save,updateById,deleteById,clearForTests};