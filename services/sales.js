const salesModels = require('../models/sales');
const { success } = require('./util');

const createSale = async (body) => {
  const saleId = await salesModels.createSale(body);
  return success.createSale(saleId, body);
};

const serializeAllSales = (array) => {
  const response = [];
  array.forEach((sale) => {
    const serializedSale = {
      saleId: sale.sale_id,
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
    };
    response.push(serializedSale);
  });
  return response;
};

const getAllSales = async () => serializeAllSales(await salesModels.getAllSales());

const getSaleById = async ({ id }) => {
  const sale = await salesModels.getSaleById(id);
  return success.getSaleById(sale);
};

const deleteSale = async ({ id }) => {
  await salesModels.deleteSale(id);
  return success.deleteProductOrSale();
};

const updateSale = async ({ params, body }) => {
  const { id } = params;
  body.forEach(async ({ productId, quantity }) => {
    salesModels.updateSale(id, productId, quantity);
  });
  return success.updateSale(params, body);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
