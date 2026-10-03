const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");
const products = require("../data/productsData");
const customers = require("../data/customersData");
const suppliers = require("../data/suppliersData");
const sales = require("../data/salesData");

test.beforeEach(() => {
  products.seedForTests();
  customers.clearForTests();
  suppliers.clearForTests();
  sales.clearForTests();
});

function unique(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

async function adminToken() {
  const response = await request(app)
    .post("/auth/login")
    .send({ username: "admin", password: "admin123" });
  assert.equal(response.status, 200);
  return response.body.data.token;
}

test("Week 5: product controller happy path returns standardized responses", async () => {
  const created = await request(app).post("/products").send({
    name: unique("Controller Pencil"),
    category: "Writing",
    quantity: 20,
    unitPrice: 12.5,
    status: "in-stock"
  });

  assert.equal(created.status, 201);
  assert.equal(created.body.status, 201);
  assert.ok(created.body.data.id);
  assert.equal(created.body.error, null);

  const detail = await request(app).get("/products/" + created.body.data.id);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.status, 200);
  assert.equal(detail.body.data.id, created.body.data.id);
  assert.equal(detail.body.error, null);
});

test("Week 5: product route validation failure returns 422 envelope", async () => {
  const response = await request(app).post("/products").send({
    name: "Bad Product",
    category: "Writing",
    quantity: -1,
    unitPrice: 10,
    status: "in-stock"
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.status, 422);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "quantity");
  assert.ok(response.body.error);
});

test("Week 5: product controller edge case returns 404 for missing record", async () => {
  const response = await request(app).get("/products/999999999");
  assert.equal(response.status, 404);
  assert.equal(response.body.status, 404);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "id");
});

test("Week 5: supplier controller happy path supports create and update", async () => {
  const created = await request(app).post("/suppliers").send({
    name: unique("Controller Supplier"),
    contact: "09123456789"
  });

  assert.equal(created.status, 201);
  const id = created.body.data.id;

  const updated = await request(app).put("/suppliers/" + id).send({
    name: unique("Updated Supplier"),
    contact: "09987654321"
  });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.status, 200);
  assert.equal(updated.body.data.id, id);
  assert.equal(updated.body.error, null);
});

test("Week 5: supplier validation failure returns 422 before persistence", async () => {
  const response = await request(app).post("/suppliers").send({
    name: "Supplier",
    contact: "123",
    email: "not-an-email"
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.status, 422);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "email");
});

test("Week 5: supplier controller edge case returns 404 for missing record", async () => {
  const response = await request(app).get("/suppliers/999999999");
  assert.equal(response.status, 404);
  assert.equal(response.body.status, 404);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "id");
});

test("Week 5: customer controller happy path supports create and read", async () => {
  const created = await request(app).post("/customers").send({
    name: unique("Controller Customer"),
    contact: "09112223344",
    email: "customer@example.com"
  });

  assert.equal(created.status, 201);
  const id = created.body.data.id;

  const detail = await request(app).get("/customers/" + id);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.status, 200);
  assert.equal(detail.body.data.id, id);
  assert.equal(detail.body.error, null);
});

test("Week 5: customer validation failure returns 422 before persistence", async () => {
  const response = await request(app).post("/customers").send({
    contact: ""
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.status, 422);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "name");
  assert.ok(response.body.error);
});

test("Week 5: customer controller edge case returns 404 for missing record", async () => {
  const response = await request(app).get("/customers/999999999");
  assert.equal(response.status, 404);
  assert.equal(response.body.status, 404);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "id");
});

test("Week 5: sales controller happy path creates a transaction and reduces stock", async () => {
  const product = await request(app).post("/products").send({
    name: unique("Controller Sale Product"),
    category: "Testing",
    quantity: 10,
    unitPrice: 15,
    status: "in-stock"
  });
  assert.equal(product.status, 201);

  const productId = product.body.data.id;
  const created = await request(app).post("/sales").send({
    items: [{ productId, quantity: 2 }]
  });

  assert.equal(created.status, 201);
  assert.equal(created.body.status, 201);
  assert.equal(created.body.data.total, 30);
  assert.equal(created.body.error, null);

  const afterSale = await request(app).get("/products/" + productId);
  assert.equal(afterSale.body.data.quantity, 8);
});

test("Week 5: sales validation failure returns 422 before controller logic", async () => {
  const response = await request(app).post("/sales").send({
    items: [{ productId: 1, quantity: 0 }]
  });

  assert.equal(response.status, 422);
  assert.equal(response.body.status, 422);
  assert.equal(response.body.data, null);
  assert.match(response.body.field, /quantity/);
  assert.ok(response.body.error);
});

test("Week 5: sales controller edge case returns 404 for missing transaction", async () => {
  const response = await request(app).get("/sales/999999999");
  assert.equal(response.status, 404);
  assert.equal(response.body.status, 404);
  assert.equal(response.body.data, null);
  assert.equal(response.body.field, "id");
});

test("Week 5: protected delete keeps authorization separate from controller logic", async () => {
  const created = await request(app).post("/products").send({
    name: unique("Protected Product"),
    category: "Testing",
    quantity: 5,
    unitPrice: 5,
    status: "in-stock"
  });
  assert.equal(created.status, 201);

  const unauthorized = await request(app).delete("/products/" + created.body.data.id);
  assert.equal(unauthorized.status, 401);
  assert.equal(unauthorized.body.status, 401);

  const token = await adminToken();
  const authorized = await request(app)
    .delete("/products/" + created.body.data.id)
    .set("Authorization", "Bearer " + token);

  assert.equal(authorized.status, 200);
  assert.equal(authorized.body.status, 200);
  assert.equal(authorized.body.error, null);
});
