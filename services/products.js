const productsModels = require('../models/products');

const getAllProducts = () => productsModels.getAllProducts();

const getProductById = async (id) => {
  const product = await productsModels.getProductById(id);
  if (!product) {
    const response = { response: { message: 'Product not found' },
      code: { code: 404 } };
    return response;
  } const response = {
    response: product,
    code: { code: 200 },
  };
  return response;
};

module.exports = {
  getAllProducts,
  getProductById,
};
