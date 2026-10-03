const salesData = require("../data/salesData");
const salesService = require("../services/salesService");

function error(res, status, message, field = null) {
  return res.status(status).json({ status, data: null, error: message, field });
}

function createSale(req, res) {
  const built = salesService.buildSale(req.validatedBody);
  if (built.error) return error(res, ...built.error);

  salesService.reduceStock(built.sale.items);
  const sale = salesData.save(built.sale);
  return res.status(201).json({ status: 201, data: sale, error: null });
}

function listSales(req, res) {
  return res.status(200).json({ status: 200, data: salesData.findAll(), error: null });
}

function getSale(req, res) {
  const sale = salesData.findById(req.params.id);
  if (!sale) return error(res, 404, "Sale not found", "id");
  return res.status(200).json({ status: 200, data: sale, error: null });
}

function updateSale(req, res) {
  const old = salesData.findById(req.params.id);
  if (!old) return error(res, 404, "Sale not found", "id");

  salesService.restoreStock(old.items);
  const built = salesService.buildSale(req.validatedBody);

  if (built.error) {
    salesService.reduceStock(old.items);
    return error(res, ...built.error);
  }

  salesService.reduceStock(built.sale.items);
  const sale = salesData.updateById(req.params.id, built.sale);
  return res.status(200).json({ status: 200, data: sale, error: null });
}

function deleteSale(req, res) {
  const old = salesData.findById(req.params.id);
  if (!old) return error(res, 404, "Sale not found", "id");

  salesService.restoreStock(old.items);
  const sale = salesData.deleteById(req.params.id);

  return res.status(200).json({
    status: 200,
    data: { message: "Sale deleted successfully", item: sale },
    error: null
  });
}

module.exports = { createSale, listSales, getSale, updateSale, deleteSale };
