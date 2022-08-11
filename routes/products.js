const express = require('express');

const productsControllers = require('../controllers/products');

const productsRoutes = express.Router();

productsRoutes.get('/', productsControllers.getAllProducts);
productsRoutes.get('/:id', productsControllers.getProductById);

module.exports = productsRoutes;
