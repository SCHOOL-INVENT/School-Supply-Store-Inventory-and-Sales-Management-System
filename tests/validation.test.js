const test = require("node:test");
const assert = require("node:assert/strict");
const {
  validateCreateSupply,
  validateUpdateSupply,
  validateCustomer,
  validateSupplier,
  validateSale
} = require("../middleware/validation");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
}

test("product create validation accepts valid input", () => {
  const req = { body: { name: "Bond Paper", category: "Paper", quantity: 50, unitPrice: 45.5, status: "in-stock" } };
  const res = mockRes();
  let called = false;
  validateCreateSupply(req, res, () => { called = true; });
  assert.equal(called, true);
  assert.equal(res.statusCode, 200);
});

test("product create validation rejects missing fields with 422", () => {
  const req = { body: { name: "Paper" } };
  const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.status, 422);
  assert.equal(res.body.field, "category");
});

test("product create validation rejects negative quantity with 422", () => {
  const req = { body: { name: "Paper", category: "Office", quantity: -1, unitPrice: 10, status: "in-stock" } };
  const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "quantity");
});

test("product create validation rejects unknown fields with 422", () => {
  const req = { body: { name: "Paper", category: "Office", quantity: 1, unitPrice: 10, status: "in-stock", unexpected: true } };
  const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "unexpected");
});

test("product update validation accepts partial updates", () => {
  const req = { body: { unitPrice: 12.25 } };
  const res = mockRes();
  let called = false;
  validateUpdateSupply(req, res, () => { called = true; });
  assert.equal(called, true);
  assert.equal(req.validatedBody.unitPrice, 12.25);
});

test("product update validation rejects an empty update with 422", () => {
  const req = { body: {} };
  const res = mockRes();
  validateUpdateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "body");
});

test("supplier validation rejects missing required fields", () => {
  const req = { body: { name: "" } };
  const res = mockRes();
  validateSupplier(req, res, () => {});
  assert.equal(res.statusCode, 422);
});

test("customer validation rejects missing required fields", () => {
  const req = { body: { contact: "" } };
  const res = mockRes();
  validateCustomer(req, res, () => {});
  assert.equal(res.statusCode, 422);
});

test("sale validation rejects empty item list", () => {
  const req = { body: { items: [] } };
  const res = mockRes();
  validateSale(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "items");
});

test("sale validation rejects zero quantity", () => {
  const req = { body: { items: [{ productId: 1, quantity: 0 }] } };
  const res = mockRes();
  validateSale(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.match(res.body.field, /quantity/);
});
