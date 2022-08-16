const serializeSale = (array) => {
  const response = [];
  array.forEach((sale) => {
    const serializedSale = {
      date: sale.date,
      productId: sale.product_id,
      quantity: sale.quantity,
    };
    response.push(serializedSale);
  });
  return response;
};

const errors = {
  noProduct: {
    response: { message: 'Product not found' },
    code: 404,
  },
  noName: {
      response: { message: '"name" is required' },
      code: 400,
  },
  noProductId: {
    response: { message: '"productId" is required' },
    code: 400,
  },
  noQuantity: {
    response: { message: '"quantity" is required' },
    code: 400,
  },
  noSale: {
    response: { message: 'Sale not found' },
    code: 404,
  },
  invalidQuantity: {
    response: { message: '"quantity" must be greater than or equal to 1' },
    code: 422,
  },
  invalidName: {
    response: { message: '"name" length must be at least 5 characters long' },
    code: 422,
  },
};

const success = {
  getProductById: (product) => ({
    response: product,
    code: 200,
  }),
  createProduct: (newProduct) => ({
    response: newProduct,
    code: 201,
  }),
  updateProduct: (id, name) => ({
    response: { id, name },
    code: 200,
  }),
  deleteProductOrSale: () => ({
    response: '',
    code: 204,
  }),
  getProductBySearch: async (product) => ({
    reponse: product,
    code: 200,
  }),
  getSaleById: (sale) => ({
    response: serializeSale(sale),
    code: 200,
  }),
  createSale: (saleId, body) => ({
    response: { 
      id: saleId,
      itemsSold: body,
    },
    code: 201,
  }),
  updateSale: ({ id }, body) => ({
    response: { saleId: id, itemsUpdated: body },
    code: 200,
  }),
};

module.exports = {
  errors,
  success,
};
