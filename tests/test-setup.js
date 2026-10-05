const test = require("node:test");
const { resetTestData, closeDatabase } = require("../data/database");
const { clearSessionsForTests } = require("../middleware/auth");

async function resetDatabase() {
  clearSessionsForTests();
  await resetTestData();
}

test.after(async () => {
  await closeDatabase();
});

module.exports = { resetDatabase };
