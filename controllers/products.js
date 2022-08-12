const productsServices = require('../services/products');

const getAllProducts = async (_req, res) => {
  const allProducts = await productsServices.getAllProducts();
  res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { response, code: { code } } = await productsServices.getProductById(id);
  res.status(code).json(response);
};

module.exports = {
  getAllProducts,
  getProductById,
};
