const express = require('express');
const productsControllers = require('../controllers/products');
const {
  isThereProductId,
  isNameValid,
  isThereAName,
} = require('../middlewares/util');

const productsRoutes = express.Router();

productsRoutes.get('/', productsControllers.getAllProducts);

productsRoutes.get('/search', productsControllers.getProductBySearch);

productsRoutes.get('/:id',
  isThereProductId,
  productsControllers.getProductById);

productsRoutes.post('/',
  isThereAName,
  isNameValid,
  productsControllers.createProduct);

productsRoutes.put('/:id',
  isThereAName,
  isNameValid,
  isThereProductId,
  productsControllers.updateProduct);

productsRoutes.delete('/:id',
  isThereProductId,
  productsControllers.deleteProduct);

module.exports = productsRoutes;
