const crypto = require("node:crypto");
const { pool, initDatabase } = require("../data/database");

const sessions = new Map();

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

function createToken(user) {
  const token = crypto.randomBytes(24).toString("hex");
  const ttlHours = Number(process.env.SESSION_TTL_HOURS || 8);
  sessions.set(token, {
    id: Number(user.id),
    username: user.username,
    role: user.role,
    expiresAt: Date.now() + ttlHours * 60 * 60 * 1000
  });
  return token;
}

async function login(username, password) {
  await initDatabase();
  const [rows] = await pool.execute(
    "SELECT id,username,password_hash,role FROM users WHERE username=? LIMIT 1",
    [username]
  );
  const user = rows[0];
  if (!user || user.password_hash !== hashPassword(password)) return null;
  return {
    token: createToken(user),
    user: { id: Number(user.id), username: user.username, role: user.role }
  };
}

async function authenticate(req, res, next) {
  const header = req.headers?.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  const session = token ? sessions.get(token) : null;

  if (!session || session.expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return res.status(401).json({
      status: 401,
      data: null,
      error: "Authentication required",
      field: "authorization"
    });
  }

  req.user = {
    id: session.id,
    username: session.username,
    role: session.role
  };
  return next();
}

async function validateAdminOrOwner(req, res, next) {
  if (!req.user) return authenticate(req, res, () => validateAdminOrOwner(req, res, next));
  if (!["admin", "owner"].includes(req.user.role)) {
    return res.status(403).json({
      status: 403,
      data: null,
      error: "Administrator or owner authorization required",
      field: "role"
    });
  }
  return next();
}

function clearSessionsForTests() {
  sessions.clear();
}

module.exports = { login, authenticate, validateAdminOrOwner, clearSessionsForTests };
