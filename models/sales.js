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

module.exports = {
  createSale,
};
