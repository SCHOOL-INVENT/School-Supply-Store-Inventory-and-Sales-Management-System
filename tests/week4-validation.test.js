const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");

async function createProduct(overrides = {}) {
  return request(app).post("/products").send({
    name: "Week4 Validation Item " + Date.now(),
    category: "Testing",
    quantity: 20,
    unitPrice: 10,
    status: "in-stock",
    ...overrides
  });
}

test("Week 4: product validators fail fast with 422", async () => {
  const cases = [
    { body: {}, field: "name" },
    { body: { name: "A", category: "Testing", quantity: 1, unitPrice: 10, status: "in-stock" }, field: "name" },
    { body: { name: "Valid", category: "Testing", quantity: -1, unitPrice: 10, status: "in-stock" }, field: "quantity" },
    { body: { name: "Valid", category: "Testing", quantity: 1, unitPrice: 10.999, status: "in-stock" }, field: "unitPrice" },
    { body: { name: "Valid", category: "Testing", quantity: 1, unitPrice: 10, status: "broken" }, field: "status" },
    { body: { name: "Valid", category: "Testing", quantity: 1, unitPrice: 10, status: "in-stock", unexpected: true }, field: "unexpected" }
  ];

  for (const item of cases) {
    const response = await request(app).post("/products").send(item.body);
    assert.equal(response.status, 422);
    assert.equal(response.body.status, 422);
    assert.equal(response.body.data, null);
    assert.equal(response.body.field, item.field);
  }
});

test("Week 4: supplier and customer validators reject malformed fields", async () => {
  const supplierCases = [
    { name: "", contact: "123" },
    { name: "Supplier", contact: "123", email: "not-an-email" },
    { name: "Supplier", contact: "123", unexpected: true }
  ];

  for (const body of supplierCases) {
    const response = await request(app).post("/suppliers").send(body);
    assert.equal(response.status, 422);
    assert.equal(response.body.status, 422);
  }

  const customer = await request(app).post("/customers").send({
    name: "Customer",
    contact: "123",
    email: "not-an-email"
  });
  assert.equal(customer.status, 422);
  assert.equal(customer.body.status, 422);
});

test("Week 4: sale item guards reject malformed input before business logic", async () => {
  const cases = [
    { items: [] },
    { items: [{ productId: 0, quantity: 1 }] },
    { items: [{ productId: 1, quantity: 0 }] },
    { items: [null] }
  ];

  for (const body of cases) {
    const response = await request(app).post("/sales").send(body);
    assert.equal(response.status, 422);
    assert.equal(response.body.status, 422);
    assert.equal(response.body.data, null);
    assert.ok(response.body.error);
  }
});

test("Week 4: empty product update is rejected", async () => {
  const created = await createProduct();
  assert.equal(created.status, 201);

  const response = await request(app).put("/products/" + created.body.data.id).send({});
  assert.equal(response.status, 422);
  assert.equal(response.body.field, "body");
});

test("Week 4: invalid low-stock threshold is rejected instead of crashing", async () => {
  const response = await request(app).get("/products/low-stock?threshold=-1");
  assert.equal(response.status, 422);
  assert.equal(response.body.field, "threshold");
});

test("Week 4: protected delete rejects missing authentication", async () => {
  const created = await createProduct();
  assert.equal(created.status, 201);

  const response = await request(app).delete("/products/" + created.body.data.id);
  assert.equal(response.status, 401);
  assert.equal(response.body.status, 401);
});
