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

const createProduct = async (name) => {
  if (!name) {
    return ({
      response: { message: '"name" is required' },
      code: { code: 400 },
    });
  } if (name.length < 5) {
    return ({
      response: { message: '"name" length must be at least 5 characters long' },
      code: { code: 422 },
    });
  } const newProduct = await productsModels.createProduct(name);
  return {
    response: newProduct,
    code: { code: 201 },
  };
};

const updateProduct = async ({ id }, { name }) => {
  const isThereAProduct = await productsModels.getProductById(id);
  if (!name) {
    return ({ response: { message: '"name" is required' }, code: { code: 400 } });
  } if (name.length < 5) {
    return ({ response: { message: '"name" length must be at least 5 characters long' },
      code: { code: 422 } });
  } if (!isThereAProduct) {
    return ({ response: { message: 'Product not found' },
      code: { code: 404 } });
  } await productsModels.updateProduct(name, id);
    return ({ response: { id, name },
      code: { code: 200 } });
};

const deleteProduct = async ({ id }) => {
  const isThereAProduct = await productsModels.getProductById(id);
  if (!isThereAProduct) {
    return ({ response: { message: 'Product not found' },
      code: 404 });
  } await productsModels.deleteProduct(id);
  return {
    response: '',
    code: 204,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
