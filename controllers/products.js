const productsServices = require('../services/products');
const { rescue } = require('../middlewares/util');

const getAllProducts = rescue(async (_req, res) => {
  const allProducts = await productsServices.getAllProducts();
  res.status(200).json(allProducts);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const { response, code } = await productsServices.getProductById(id);
  res.status(code).json(response);
});

const createProduct = rescue(async (req, res) => {
  const { name } = req.body;
  const { response, code } = await productsServices.createProduct(name);
  res.status(code).json(response);
});

const updateProduct = rescue(async (req, res) => {
  const { params, body } = req;
  const { response, code } = await productsServices.updateProduct(params, body);
  res.status(code).json(response);
});

const deleteProduct = rescue(async (req, res) => {
  const { response, code } = await productsServices.deleteProduct(req.params);
  res.status(code).json(response);
});

const getProductBySearch = rescue(async (req, res) => {
  const { response, code } = await productsServices.getProductBySearch(req);
  res.status(code).json(response);
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
};
