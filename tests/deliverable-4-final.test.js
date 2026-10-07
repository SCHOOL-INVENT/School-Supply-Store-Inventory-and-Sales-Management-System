const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const request = require("supertest");
const app = require("../app");

const root = path.join(__dirname, "..");

test("Deliverable 4: production API root reports MySQL", async () => {
  const response = await request(app).get("/");
  assert.equal(response.status, 200);
  assert.equal(response.body.data.database, "MySQL");
  assert.equal(response.body.data.version, "3.0.0");
});

test("Deliverable 4: deployed UI entry is served", async () => {
  const response = await request(app).get("/ui/");
  assert.equal(response.status, 200);
  assert.match(response.text, /login\.html/);
});

test("Deliverable 4: key UI assets are served", async () => {
  const css = await request(app).get("/ui/css/styles.css");
  const dashboard = await request(app).get("/ui/dashboard.html");
  assert.equal(css.status, 200);
  assert.match(css.headers["content-type"], /text\/css/);
  assert.equal(dashboard.status, 200);
  assert.match(dashboard.text, /Low Stock Alerts/);
});

test("Deliverable 4: list rendering escapes dynamic values", () => {
  const source = fs.readFileSync(
    path.join(root, "public", "ui", "js", "list.js"),
    "utf8"
  );
  assert.match(source, /function escapeHtml\(v\)/);
  assert.match(source, /return escapeHtml\(value\)/);
  assert.match(source, /escapeHtml\(status\)/);
});

test("Deliverable 4: edit forms keep a missing target disabled", () => {
  const source = fs.readFileSync(
    path.join(root, "public", "ui", "js", "forms.js"),
    "utf8"
  );
  assert.match(source, /if\(!id\).*button\.disabled=true/);
  assert.match(source, /if\(notFound\)\{button\.disabled=true;\}/);
});

test("Deliverable 4: deployment documentation contains the Railway application URL", () => {
  const source = fs.readFileSync(
    path.join(root, "docs", "deployment.md"),
    "utf8"
  );
  assert.match(
    source,
    /https:\/\/school-supply-store-inventory-and-sales-management-production\.up\.railway\.app\/ui\//
  );
  assert.doesNotMatch(source, /DB_PASSWORD\s*=\s*[^\n]+/);
});
