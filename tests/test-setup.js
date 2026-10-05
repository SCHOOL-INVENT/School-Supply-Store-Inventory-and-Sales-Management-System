const { resetTestData } = require("../data/database");

async function resetDatabase() {
  await resetTestData();
}

module.exports = { resetDatabase };
