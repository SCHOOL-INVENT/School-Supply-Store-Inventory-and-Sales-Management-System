const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const request = require("supertest");
const app = require("../app");

test("Week 11: public UI entry remains reachable", async () => {
  const response = await request(app).get("/ui/");
  assert.equal(response.status, 200);
  assert.match(response.text, /login\.html/);
});

test("Week 11: list renderer escapes dynamic cell values", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "public", "ui", "js", "list.js"),
    "utf8"
  );

  assert.match(source, /return escapeHtml\(value\);/);
});
