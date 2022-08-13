const express = require('express');
const salesControllers = require('../controllers/sales');

const salesRoutes = express.Router();

salesRoutes.post('/', salesControllers.createSale);

module.exports = salesRoutes;
