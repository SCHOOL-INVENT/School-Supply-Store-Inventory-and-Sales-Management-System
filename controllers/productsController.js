const data = require("../data/productsData");
const productService = require("../services/productService");

async function getAllProducts(req, res) {
  return res.status(200).json({ status: 200, data: await data.findAll(), error: null });
}
async function getProductById(req, res) {
  const item = await data.findById(req.params.id);
  if (!item) return res.status(404).json({ status: 404, data: null, error: "Product not found", field: "id" });
  return res.status(200).json({ status: 200, data: item, error: null });
}
async function createProduct(req, res) {
  const item = await data.save(productService.prepareForCreate(req.validatedBody));
  return res.status(201).json({ status: 201, data: item, error: null });
}
async function updateProduct(req, res) {
  const old = await data.findById(req.params.id);
  if (!old) return res.status(404).json({ status: 404, data: null, error: "Product not found", field: "id" });
  const item = await data.updateById(req.params.id, productService.prepareForUpdate(old, req.validatedBody));
  return res.status(200).json({ status: 200, data: item, error: null });
}
async function deleteProduct(req, res) {
  try {
    const item = await data.deleteById(req.params.id);
    if (!item) return res.status(404).json({ status: 404, data: null, error: "Product not found", field: "id" });
    return res.status(200).json({ status: 200, data: { message: "Product deleted successfully", item }, error: null });
  } catch (error) {
    if (error && ["ER_ROW_IS_REFERENCED_2","ER_ROW_IS_REFERENCED"].includes(error.code)) {
      return res.status(409).json({ status: 409, data: null, error: "Product cannot be deleted because it is referenced by transaction records", field: "id" });
    }
    throw error;
  }
}
async function searchProducts(req, res) {
  return res.status(200).json({ status: 200, data: await data.search(req.query.q), error: null });
}
async function getLowStock(req, res) {
  const threshold = req.query.threshold === undefined ? 10 : Number(req.query.threshold);
  if (!Number.isFinite(threshold) || threshold < 0) {
    return res.status(422).json({ status: 422, data: null, error: "threshold must be a non-negative number", field: "threshold" });
  }
  return res.status(200).json({ status: 200, data: await data.lowStock(threshold), error: null });
}
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts, getLowStock };
