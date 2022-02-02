const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (DEFAULT)', [new Date()],
); 
    return { id: result.insertId };
};

const createSalesProduct = async ({ productId, quantity, id }) => {
  await connection
    .query('INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [id, productId, quantity]);
  return { id, productId, quantity };
};

const getAll = async () => {
  const [sales] = await connection
    .query(`SELECT saleProducts.sale_id as saleId,
    sale.date, saleProducts.product_id, saleProducts.quantity 
    FROM StoreManager.sales_products as saleProducts 
    INNER JOIN StoreManager.sales as sale ON saleProducts.sale_id = sale.id`);

  return sales;
};

const getById = async (id) => {
  const [sales] = await connection
    .query(`SELECT sale.date, saleProducts.product_id, saleProducts.quantity
    FROM StoreManager.sales_products as saleProducts INNER JOIN StoreManager.sales as sale
    ON saleProducts.sale_id = sale.id
    WHERE saleProducts.sale_id = ?`, [id]);

  if (sales.length === 0) return null;
  
  return sales;
};

module.exports = {
  createSale,
  createSalesProduct,
  getAll,
  getById,
};