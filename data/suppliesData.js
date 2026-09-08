let supplies = [
  { id: 1, name: "Ballpen", category: "Writing", quantity: 120, unitPrice: 15, status: "in-stock", supplierId: 1 },
  { id: 2, name: "Notebook", category: "Paper", quantity: 80, unitPrice: 35, status: "in-stock", supplierId: 2 },
  { id: 3, name: "Pencil", category: "Writing", quantity: 40, unitPrice: 10, status: "low-stock", supplierId: 1 },
  { id: 4, name: "Eraser", category: "Writing", quantity: 150, unitPrice: 8, status: "in-stock", supplierId: 1 },
  { id: 5, name: "Ruler", category: "Tools", quantity: 60, unitPrice: 20, status: "in-stock", supplierId: 2 },
  { id: 6, name: "Glue", category: "Supplies", quantity: 40, unitPrice: 25, status: "low-stock", supplierId: 2 }
];
let nextId = 7;

function clone(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
function findAll() { return clone(supplies); }
function findById(id) { return clone(supplies.find(item => item.id === Number(id)) || null); }
function save(item) { const record = { ...item, id: nextId++ }; supplies.push(record); return clone(record); }
function updateById(id, changes) { const index = supplies.findIndex(item => item.id === Number(id)); if (index === -1) return null; supplies[index] = { ...supplies[index], ...changes }; return clone(supplies[index]); }
function deleteById(id) { const index = supplies.findIndex(item => item.id === Number(id)); if (index === -1) return null; return clone(supplies.splice(index, 1)[0]); }
function search(term) { const q = String(term || '').trim().toLowerCase(); return clone(supplies.filter(item => !q || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))); }
function lowStock(threshold = 10) { return clone(supplies.filter(item => item.quantity <= Number(threshold))); }
function clearForTests() { supplies = []; nextId = 1; }
function seedForTests() { supplies = [
  { id: 1, name: "Ballpen", category: "Writing", quantity: 120, unitPrice: 15, status: "in-stock", supplierId: 1 },
  { id: 2, name: "Notebook", category: "Paper", quantity: 80, unitPrice: 35, status: "in-stock", supplierId: 2 }
]; nextId = 3; }
module.exports = { findAll, findById, save, updateById, deleteById, search, lowStock, clearForTests, seedForTests };
