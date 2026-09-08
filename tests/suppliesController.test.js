const test = require("node:test");
const assert = require("node:assert/strict");
const { createSupply, getSupplyById, updateSupply, deleteSupply } = require("../controllers/suppliesController");
const suppliesData = require("../data/suppliesData");

function mockReqRes(body = {}, params = {}) {
  const req = { validatedBody: body, params };
  const res = { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(payload) { this.body = payload; return this; } };
  return { req, res };
}

test.beforeEach(() => suppliesData.seedForTests());

test("createSupply adds a valid school supply item and returns 201", () => {
  const { req, res } = mockReqRes({ name: "Bond Paper", category: "Paper", quantity: 50, unitPrice: 45.50, status: "in-stock" });
  createSupply(req, res);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.status, 201);
  assert.equal(res.body.error, null);
  assert.equal(res.body.data.name, "Bond Paper");
});

test("getSupplyById returns 404 for an unknown supply", () => {
  const { req, res } = mockReqRes({}, { id: 999 });
  getSupplyById(req, res);
  assert.equal(res.statusCode, 404);
  assert.equal(res.body.field, "id");
});

test("updateSupply updates an existing supply", () => {
  const { req, res } = mockReqRes({ quantity: 25 }, { id: 1 });
  updateSupply(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.data.quantity, 25);
});

test("deleteSupply removes an existing supply", () => {
  const { req, res } = mockReqRes({}, { id: 1 });
  deleteSupply(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(suppliesData.findById(1), null);
});
