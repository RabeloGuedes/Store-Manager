const salesServices = require('../services/sales');

const createSale = async (req, res) => {
  const { body } = req;
  const { response, code: { code } } = await salesServices.createSale(body);
  res.status(code).json(response);
};

module.exports = {
  createSale,
};
