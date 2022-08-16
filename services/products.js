const productsModels = require('../models/products');
const { success } = require('./util');

const getAllProducts = () => productsModels.getAllProducts();

const getProductById = async (id) => {
  const product = await productsModels.getProductById(id);
  return success.getProductById(product);
};

const createProduct = async (name) => {
  const newProduct = await productsModels.createProduct(name);
  return success.createProduct(newProduct);
};

const updateProduct = async ({ id }, { name }) => {
  await productsModels.updateProduct(name, id);
    return success.updateProduct(id, name);
};

const deleteProduct = async ({ id }) => {
  await productsModels.deleteProduct(id);
  return success.deleteProductOrSale();
};

const getProductBySearch = async ({ query }) => {
  const { q } = query;
  const allProductsResponse = {
    response: await productsModels.getAllProducts(),
    code: 200,
  };
  if (!q) return allProductsResponse;
  const product = await productsModels.getProductBySearch(q);
  const productsReponse = {
    response: product,
    code: 200,
  };
  return productsReponse;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
};
