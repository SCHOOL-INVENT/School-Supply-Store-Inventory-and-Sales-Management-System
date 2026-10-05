const { resetTestData } = require("../data/database");
const { clearSessionsForTests } = require("../middleware/auth");

async function resetDatabase() {
  clearSessionsForTests();
  await resetTestData();
}

module.exports = { resetDatabase };
