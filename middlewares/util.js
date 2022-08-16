const { errors } = require('../util');
const productsModels = require('../models/products');
const salesModels = require('../models/sales');

const rescue = (action) => async (req, res, next) => {
  try {
    await action(req, res, next);
  } catch (err) {
      next(err);
    }
};
  
const isThereAName = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.noName;
  if (!body.name) return res.status(code).json(response);
  next();
});

const isNameValid = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.invalidName;
    if (body.name.length < 5) return res.status(code).json(response);
  next();
});

const isThereProductId = rescue(async (req, res, next) => {
  const { params: { id } } = req;
  const { response, code } = errors.noProduct;
  const isThereAProduct = await productsModels.getProductById(id);
  if (!isThereAProduct) return res.status(code).json(response);
  next();
});

const isThereProductIdForSales = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.noProductId;
  let isThereAProductIdKey = true;
  body.forEach((product) => {
    if (!product.productId) isThereAProductIdKey = false;
  });
  if (!isThereAProductIdKey) return res.status(code).json(response);
  next();
});

const isProductIdValid = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.noProduct;
  const allProducts = await productsModels.getAllProducts();  
  let isThereAValidProductId = true; 
  body.forEach(({ productId }) => {
    const isThereAProduct = allProducts.some(({ id }) => Number(productId) === Number(id));
    if (!isThereAProduct) isThereAValidProductId = false; 
  });
  if (!isThereAValidProductId) return res.status(code).json(response);
  next();
});

const isQuantityValid = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.invalidQuantity;
  let isTheQuantityValid = true; 
  body.forEach((product) => {
    if (product.quantity <= 0) isTheQuantityValid = false;
  });
  if (!isTheQuantityValid) return res.status(code).json(response); 
  next();
});

const isThereQuantity = rescue(async (req, res, next) => {
  const { body } = req;
  const { response, code } = errors.noQuantity;
  let isThereAQuantityKey = true; 
  body.forEach((product) => {
    if (!product.quantity) isThereAQuantityKey = false;
  });
  if (!isThereAQuantityKey) return res.status(code).json(response);
  next();
});

const isThereASale = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { response, code } = errors.noSale;
  const sale = await salesModels.getSaleById(id);
  if (!sale.length) return res.status(code).json(response);
  next();
});

module.exports = {
  isThereProductId,
  isProductIdValid,
  isQuantityValid,
  isThereQuantity,
  isThereASale,
  isThereAName,
  isNameValid,
  isThereProductIdForSales,
  rescue,
};