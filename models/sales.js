const connection = require('./connection');

const createSale = async (body) => {
  const currentDate = '2022-08-13';
  const [newSale] = await connection.execute('INSERT INTO sales (date) VALUES (?)', [currentDate]);
  body.forEach(async ({ productId, quantity }) => {
    await connection.execute(`INSERT INTO sales_products
    (product_id, sale_id, quantity)
    VALUES (?, ?, ?)`, [productId, newSale.insertId, quantity]);
  });
  return newSale.insertId;
};

const getAllSales = async () => {
  const [allSales] = await connection.execute(`
  SELECT  sp.sale_id,
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products as sp
  INNER JOIN sales as s
  ON sp.sale_id = s.id
  ORDER BY s.id,
  sp.product_id`);
  return allSales;
};

const getSaleById = async (id) => {
  const [allSales] = await connection.execute(`
  SELECT
  s.date,
  sp.product_id,
  sp.quantity
  FROM sales_products as sp
  INNER JOIN sales as s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY s.id,
  sp.product_id`, [id]);
  return allSales;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
};

const updateSale = async (saleId, productId, quantity) => {
  await connection.execute(`
    UPDATE sales_products
    set quantity = ?
    WHERE sale_id = ?
    AND product_id = ?`, [quantity, saleId, productId]);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
