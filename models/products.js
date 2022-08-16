const connection = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT id, name FROM products');
  return allProducts;
};

const getProductById = async (id) => {
  const [product] = await connection.execute('SELECT id, name FROM products WHERE id = ?', [id]);
  return product[0];
};

const createProduct = async (name) => {
  const [newProduct] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: newProduct.insertId, name };
};

const updateProduct = async (name, id) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

const getProductBySearch = async (term) => {
  const [product] = await connection.execute(`
  SELECT id, name
  FROM products
  WHERE name LIKE ?`, [`%${term}%`]);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySearch,
};
