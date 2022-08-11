const connection = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT id, name FROM products');
  return allProducts;
};

const getProductById = async (id) => {
  const [product] = await connection.execute('SELECT id, name FROM products WHERE id = ?', [id]);
  return product[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};
