const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");
const products = require("../data/productsData");
const { resetDatabase } = require("./test-setup");

test.beforeEach(async () => resetDatabase());

async function token() {
  const r = await request(app).post("/auth/login").send({username:"admin",password:"admin123"});
  assert.equal(r.status,200);
  return r.body.data.token;
}

test("stock in increases product quantity and records a movement", async () => {
  const bearer = await token();
  const r = await request(app).post("/stock/in").set("Authorization","Bearer "+bearer)
    .send({productId:1,quantity:5,reference:"PO-1001"});
  assert.equal(r.status,200);
  assert.equal(r.body.data.product.quantity,125);
  const p=await products.findById(1);
  assert.equal(p.quantity,125);
  const history=await request(app).get("/stock/transactions").set("Authorization","Bearer "+bearer);
  assert.equal(history.status,200);
  assert.equal(history.body.data[0].type,"IN");
});

test("stock out rejects an oversell and leaves inventory unchanged", async () => {
  const bearer = await token();
  const r = await request(app).post("/stock/out").set("Authorization","Bearer "+bearer)
    .send({productId:1,quantity:9999});
  assert.equal(r.status,422);
  const p=await products.findById(1);
  assert.equal(p.quantity,120);
});

test("stock endpoints require authentication", async () => {
  assert.equal((await request(app).post("/stock/in").send({productId:1,quantity:1})).status,401);
  assert.equal((await request(app).get("/stock/transactions")).status,401);
});
