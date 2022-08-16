const express = require('express');
const salesControllers = require('../controllers/sales');
const {
  isProductIdValid,
  isQuantityValid,
  isThereQuantity,
  isThereASale,
  isThereProductIdForSales,
} = require('../middlewares/util');

const salesRoutes = express.Router();

salesRoutes.post('/',
  isThereProductIdForSales,
  isQuantityValid,
  isThereQuantity,
  isProductIdValid,
  salesControllers.createSale);

salesRoutes.get('/', salesControllers.getAllSales);

salesRoutes.get('/:id', isThereASale, salesControllers.getSaleById);

salesRoutes.delete('/:id',
  isThereASale,
  salesControllers.deleteSale);

salesRoutes.put('/:id',
  isThereASale,
  isThereProductIdForSales,
  isQuantityValid,
  isThereQuantity,
  isProductIdValid,
  salesControllers.updateSale);

module.exports = salesRoutes;
