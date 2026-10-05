const app = require("./app");
const { initDatabase } = require("./data/database");

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Unable to initialize MySQL database:", error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) start();

module.exports = { start };
