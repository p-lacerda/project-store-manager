const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (DEFAULT)',
);
    return result.insertId;
};

const createSalesProduct = async ({ productId, quantity, id }) => {
  const [sale] = await connection
    .query('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, productId, quantity]);
  return sale;
};

module.exports = {
  createSale,
  createSalesProduct,
};