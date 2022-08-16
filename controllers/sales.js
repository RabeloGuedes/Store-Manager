const salesServices = require('../services/sales');
const { rescue } = require('../middlewares/util');

const createSale = rescue(async (req, res) => {
  const { body } = req;
  const { response, code } = await salesServices.createSale(body);
  res.status(code).json(response);
});

const getAllSales = rescue(async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  res.status(200).json(allSales);
});

const getSaleById = rescue(async (req, res) => {
  const { params } = req;
  const { response, code } = await salesServices.getSaleById(params);
  res.status(code).json(response);
});

const deleteSale = rescue(async (req, res) => {
  const { params } = req;
  const { response, code } = await salesServices.deleteSale(params);
  res.status(code).json(response);
});

const updateSale = rescue(async (req, res) => {
  const { response, code } = await salesServices.updateSale(req);
  res.status(code).json(response);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
