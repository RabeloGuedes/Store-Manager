const express = require('express');
const salesControllers = require('../controllers/sales');

const salesRoutes = express.Router();

salesRoutes.post('/', salesControllers.createSale);
salesRoutes.get('/', salesControllers.getAllSales);
salesRoutes.get('/:id', salesControllers.getSaleById);

module.exports = salesRoutes;
