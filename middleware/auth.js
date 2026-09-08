const crypto = require("node:crypto");

const users = [
  { id: 1, username: "admin", role: "admin", passwordHash: hashPassword("admin123") },
  { id: 2, username: "staff", role: "staff", passwordHash: hashPassword("staff123") }
];
const sessions = new Map();

function hashPassword(password) { return crypto.createHash("sha256").update(String(password)).digest("hex"); }
function createToken(user) { const token = crypto.randomBytes(24).toString("hex"); sessions.set(token, { id: user.id, username: user.username, role: user.role }); return token; }
function login(username, password) { const user = users.find(u => u.username === username && u.passwordHash === hashPassword(password)); if (!user) return null; return { token: createToken(user), user: { id: user.id, username: user.username, role: user.role } }; }
function authenticate(req, res, next) {
  const header = req.headers?.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token || !sessions.has(token)) return res.status(401).json({ status: 401, data: null, error: "Authentication required", field: "authorization" });
  req.user = sessions.get(token); next();
}
function validateAdminOrOwner(req, res, next) {
  const role = req.user?.role || req.headers?.["x-user-role"];
  if (!["admin", "owner"].includes(role)) return res.status(403).json({ status: 403, data: null, error: "Administrator or owner authorization required", field: "role" });
  req.user = req.user || { role }; next();
}
function clearSessionsForTests(){sessions.clear();}
module.exports = { login, authenticate, validateAdminOrOwner, clearSessionsForTests };
