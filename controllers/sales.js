const salesServices = require('../services/sales');

const createSale = async (req, res) => {
  const { body } = req;
  const { response, code: { code } } = await salesServices.createSale(body);
  res.status(code).json(response);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { response, code: { code } } = await salesServices.getSaleById(req);
  res.status(code).json(response);
};

const deleteSale = async (req, res) => {
  const { response, code: { code } } = await salesServices.deleteSale(req.params);
  res.status(code).json(response);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
};
