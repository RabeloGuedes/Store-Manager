const express = require('express');

const productsControllers = require('../controllers/products');

const productsRoutes = express.Router();

productsRoutes.get('/', productsControllers.getAllProducts);
productsRoutes.get('/:id', productsControllers.getProductById);
productsRoutes.post('/', productsControllers.createProduct);
productsRoutes.put('/:id', productsControllers.updateProduct);
productsRoutes.delete('/:id', productsControllers.deleteProduct);

module.exports = productsRoutes;
