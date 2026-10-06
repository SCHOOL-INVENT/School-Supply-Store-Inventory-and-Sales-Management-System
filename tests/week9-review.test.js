const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");

test("Week 9: /ui/ serves the application entry page", async () => {
  const response = await request(app).get("/ui/");

  assert.equal(response.status, 200);
  assert.match(response.text, /login\.html/);
});

test("Week 9: UI CSS route is reachable", async () => {
  const response = await request(app).get("/ui/css/styles.css");

  assert.equal(response.status, 200);
  assert.match(response.text, /--primary/);
});
