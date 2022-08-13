const salesModels = require('../models/sales');
const productsModels = require('../models/products');

const errors = {
  noProductId: { response: { message: '"productId" is required' }, code: { code: 400 } },
  noQuantity: { response: { message: '"quantity" is required' }, code: { code: 400 } },
  invalidQuantity: {
    response:
      { message: '"quantity" must be greater than or equal to 1' },
    code: { code: 422 },
  },
  invalidProductId: { response: { message: 'Product not found' }, code: { code: 404 } },
};

// First to be fired
const isThereProductId = (body) => {
  let isThereAProductIdKey = true; 
  body.forEach((product) => {
    const isThereAProperty = Object.prototype.hasOwnProperty.call(product, 'productId');
    if (!isThereAProperty) isThereAProductIdKey = false;
  });
  return isThereAProductIdKey;
};

// Second to be fired
const isProductIdValid = async (body) => {
  const allProducts = await productsModels.getAllProducts();  
  let isThereAValidProductIdKey = true; 
  body.forEach(({ productId }) => {
    const isThereAProduct = allProducts.some(({ id }) => Number(productId) === Number(id));
    if (!isThereAProduct) isThereAValidProductIdKey = false; 
  });
  return isThereAValidProductIdKey;
};

// Third to be fired 
const isQuantityValid = (body) => {
  let isTheQuantityValid = true; 
  body.forEach((product) => {
    if (product.quantity <= 0) isTheQuantityValid = false;
  });
  return isTheQuantityValid;
};

// Last one to be fired
const isThereQuantity = (body) => {
  let isThereAQuantityKey = true; 
  body.forEach((product) => {
    if (!product.quantity) isThereAQuantityKey = false;
  });
  return isThereAQuantityKey;
};

const createSale = async (body) => {
  if (!isThereProductId(body)) return errors.noProductId;
  if (!(await isProductIdValid(body))) return errors.invalidProductId;
  if (!isQuantityValid(body)) return errors.invalidQuantity;
  if (!isThereQuantity(body)) return errors.noQuantity;
  const saleId = await salesModels.createSale(body);
  const response = {
    response: { 
      id: saleId,
      itemsSold: body,
    },
    code: { code: 201 },
  };
  return response;
};

module.exports = {
  createSale,
};
