const connection = require('./connection');

const createSale = async (body) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`;
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

module.exports = {
  createSale,
  getAllSales,
};
