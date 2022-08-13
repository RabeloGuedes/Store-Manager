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

module.exports = {
  createSale,
  getAllSales,
};
