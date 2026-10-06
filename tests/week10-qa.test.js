const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");
const { validateCreateSupply, validateCustomer } = require("../middleware/validation");

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
}

test("Week 10: UI entry route returns the browser entry page", async () => {
  const response = await request(app).get("/ui/");
  assert.equal(response.status, 200);
  assert.match(response.text, /login\.html/);
});

test("Week 10: direct URL to a missing UI resource returns 404", async () => {
  const response = await request(app).get("/ui/record-that-does-not-exist.html");
  assert.equal(response.status, 404);
  assert.equal(response.body.status, 404);
});

test("Week 10: product quantity 9999 is accepted", () => {
  const req = { body: { name: "Boundary Product", category: "Paper", quantity: 9999, unitPrice: 10, status: "in-stock" } };
  const res = mockRes();
  let called = false;
  validateCreateSupply(req, res, () => { called = true; });
  assert.equal(called, true);
  assert.equal(res.statusCode, 200);
});

test("Week 10: product quantity 10000 is rejected", () => {
  const req = { body: { name: "Too Many", category: "Paper", quantity: 10000, unitPrice: 10, status: "in-stock" } };
  const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "quantity");
});

test("Week 10: customer name over 100 characters is rejected", () => {
  const req = { body: { name: "A".repeat(101), contact: "09170000000" } };
  const res = mockRes();
  validateCustomer(req, res, () => {});
  assert.equal(res.statusCode, 422);
  assert.equal(res.body.field, "name");
});
