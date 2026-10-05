const express = require("express");
const app = express();

app.use(express.json({ limit: "1mb" }));
// The UI pages live in public/ui while the shared stylesheet lives in public/css.
app.use("/ui/css", express.static("public/css"));
app.use("/ui", express.static("public/ui"));

app.get("/", (req, res) => res.status(200).json({
  status: 200,
  data: {
    name: "School Supply Store Inventory and Sales Management System",
    version: "3.0.0",
    database: "MySQL"
  },
  error: null
}));

app.use("/auth", require("./controllers/routes/auth"));
app.use("/dashboard", require("./controllers/routes/dashboard"));
app.use("/products", require("./controllers/routes/products"));
app.use("/supplies", require("./controllers/routes/supplies"));
app.use("/customers", require("./controllers/routes/customers"));
app.use("/suppliers", require("./controllers/routes/suppliers"));
app.use("/sales", require("./controllers/routes/sales"));
app.use("/orders", require("./controllers/routes/sales"));
app.use("/reports", require("./controllers/routes/reports"));
app.use("/stock", require("./controllers/routes/stock"));

app.use((req, res) => res.status(404).json({
  status: 404,
  data: null,
  error: "Route not found",
  field: null
}));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(422).json({
      status: 422,
      data: null,
      error: "Invalid JSON request body",
      field: "body"
    });
  }

  const status = Number(err.statusCode || err.status || 500);
  return res.status(status).json({
    status,
    data: null,
    error: status >= 500 ? "Internal server error" : (err.message || "Request failed"),
    field: err.field || null
  });
});

module.exports = app;
