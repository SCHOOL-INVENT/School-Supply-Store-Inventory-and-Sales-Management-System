const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");

async function token() {
  const response = await request(app)
    .post("/auth/login")
    .send({ username: "admin", password: "admin123" });
  assert.equal(response.status, 200);
  return response.body.data.token;
}

function unique(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

test("Deliverable 2: product full CRUD and standardized responses", async () => {
  const auth = await token();
  const name = unique("Test Pencil");

  const create = await request(app).post("/products").send({
    name,
    category: "Testing",
    quantity: 25,
    unitPrice: 12.5,
    status: "in-stock"
  });
  assert.equal(create.status, 201);
  assert.equal(create.body.status, 201);
  assert.equal(create.body.error, null);

  const id = create.body.data.id;
  assert.ok(id);

  const list = await request(app).get("/products");
  assert.equal(list.status, 200);
  assert.ok(list.body.data.some(item => item.id === id));

  const detail = await request(app).get("/products/" + id);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.data.id, id);

  const update = await request(app).put("/products/" + id).send({ quantity: 8 });
  assert.equal(update.status, 200);
  assert.equal(update.body.data.quantity, 8);
  assert.equal(update.body.data.status, "low-stock");

  const remove = await request(app)
    .delete("/products/" + id)
    .set("Authorization", "Bearer " + auth);
  assert.equal(remove.status, 200);

  const missing = await request(app).get("/products/" + id);
  assert.equal(missing.status, 404);
});

test("Deliverable 2: supplier and customer CRUD", async () => {
  const auth = await token();

  const supplier = await request(app).post("/suppliers").send({
    name: unique("Test Supplier"),
    contact: "09990000001"
  });
  assert.equal(supplier.status, 201);
  const supplierId = supplier.body.data.id;

  assert.equal((await request(app).get("/suppliers/" + supplierId)).status, 200);
  assert.equal((await request(app).put("/suppliers/" + supplierId).send({
    name: unique("Updated Supplier"),
    contact: "09990000002"
  })).status, 200);
  assert.equal((await request(app).delete("/suppliers/" + supplierId)
    .set("Authorization", "Bearer " + auth)).status, 200);

  const customer = await request(app).post("/customers").send({
    name: unique("Test Customer"),
    contact: "09991110001"
  });
  assert.equal(customer.status, 201);
  const customerId = customer.body.data.id;

  assert.equal((await request(app).get("/customers/" + customerId)).status, 200);
  assert.equal((await request(app).put("/customers/" + customerId).send({
    name: unique("Updated Customer"),
    contact: "09991110002"
  })).status, 200);
  assert.equal((await request(app).delete("/customers/" + customerId)
    .set("Authorization", "Bearer " + auth)).status, 200);
});

test("Deliverable 2: sale logic creates, updates, and restores stock", async () => {
  const product = await request(app).post("/products").send({
    name: unique("Sale Test Item"),
    category: "Testing",
    quantity: 20,
    unitPrice: 10,
    status: "in-stock"
  });
  assert.equal(product.status, 201);
  const productId = product.body.data.id;

  const created = await request(app).post("/sales").send({
    items: [{ productId, quantity: 3 }]
  });
  assert.equal(created.status, 201);
  assert.equal(created.body.data.total, 30);

  const afterCreate = await request(app).get("/products/" + productId);
  assert.equal(afterCreate.body.data.quantity, 17);

  const saleId = created.body.data.id;
  const updated = await request(app).put("/sales/" + saleId).send({
    items: [{ productId, quantity: 5 }]
  });
  assert.equal(updated.status, 200);

  const afterUpdate = await request(app).get("/products/" + productId);
  assert.equal(afterUpdate.body.data.quantity, 15);

  const deleted = await request(app).delete("/sales/" + saleId);
  assert.equal(deleted.status, 200);

  const afterDelete = await request(app).get("/products/" + productId);
  assert.equal(afterDelete.body.data.quantity, 20);
});

test("Deliverable 2: validation failures return 422 instead of 500", async () => {
  const cases = [
    request(app).post("/products").send({}),
    request(app).post("/products").send({
      name: "Bad",
      category: "Testing",
      quantity: -1,
      unitPrice: 10,
      status: "in-stock"
    }),
    request(app).post("/suppliers").send({ name: "" }),
    request(app).post("/customers").send({ contact: "" }),
    request(app).post("/sales").send({ items: [] }),
    request(app).post("/sales").send({
      items: [{ productId: 1, quantity: 0 }]
    })
  ];

  const responses = await Promise.all(cases);
  for (const response of responses) {
    assert.equal(response.status, 422);
    assert.equal(response.body.status, 422);
    assert.equal(response.body.data, null);
    assert.ok(response.body.error);
  }
});

test("Deliverable 2: edge cases use 404/403 consistently", async () => {
  const auth = await token();

  const missingProduct = await request(app).get("/products/999999999");
  assert.equal(missingProduct.status, 404);
  assert.equal(missingProduct.body.field, "id");

  const missingSale = await request(app).get("/sales/999999999");
  assert.equal(missingSale.status, 404);

  const product = await request(app).post("/products").send({
    name: unique("Edge Test Product"),
    category: "Testing",
    quantity: 5,
    unitPrice: 3,
    status: "in-stock"
  });
  assert.equal(product.status, 201);
  const productId = product.body.data.id;

  const unauthorizedDelete = await request(app).delete("/products/" + productId);
  assert.equal(unauthorizedDelete.status, 401);

  const authorizedDelete = await request(app)
    .delete("/products/" + productId)
    .set("Authorization", "Bearer " + auth);
  assert.equal(authorizedDelete.status, 200);
});
