const salesData = require("../data/salesData");
const salesService = require("../services/salesService");

function sendError(res, error) {
  return res.status(error.statusCode || 500).json({
    status: error.statusCode || 500,
    data: null,
    error: error.statusCode ? error.message : "Internal server error",
    field: error.field || null
  });
}

async function createSale(req, res) {
  try {
    const sale = await salesService.createSale(req.validatedBody, req.user ? req.user.id : null);
    return res.status(201).json({ status: 201, data: sale, error: null });
  } catch (error) {
    return sendError(res, error);
  }
}

async function listSales(req, res) {
  return res.status(200).json({ status: 200, data: await salesData.findAll(), error: null });
}

async function getSale(req, res) {
  const sale = await salesData.findById(req.params.id);
  if (!sale) return res.status(404).json({ status: 404, data: null, error: "Sale not found", field: "id" });
  return res.status(200).json({ status: 200, data: sale, error: null });
}

async function updateSale(req, res) {
  try {
    const sale = await salesService.updateSale(req.params.id, req.validatedBody, req.user ? req.user.id : null);
    return res.status(200).json({ status: 200, data: sale, error: null });
  } catch (error) {
    return sendError(res, error);
  }
}

async function deleteSale(req, res) {
  try {
    await salesService.deleteSale(req.params.id, req.user ? req.user.id : null);
    return res.status(200).json({ status: 200, data: { message: "Sale deleted successfully" }, error: null });
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = { createSale, listSales, getSale, updateSale, deleteSale };
