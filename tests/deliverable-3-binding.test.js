const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const request = require("supertest");
const app = require("../app");

test("Deliverable 3: UI entry page is available", async () => {
  const response = await request(app).get("/ui/");
  assert.equal(response.status, 200);
  assert.match(response.text, /login\.html/);
});

test("Deliverable 3: shared form binding contains guarded 404 handling", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "public", "ui", "js", "forms.js"),
    "utf8"
  );
  assert.match(source, /let notFound=false/);
  assert.match(source, /if\(notFound\)\{button\.disabled=true;\}/);
});

test("Deliverable 3: forms use shared human-readable error mapping", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "public", "ui", "js", "forms.js"),
    "utf8"
  );
  assert.match(source, /UIFeedback\.humanError\(res,err\)/);
});
