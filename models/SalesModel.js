const connection = require('./connection');

const getNewSale = (body) => {
  console.log(body);
};

const createSale = async (body) => {
  const { product_id: id, quantity } = body[0];
  await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (?)',
    [id],
  );
  return getNewSale(body);
};

module.exports = {
  createSale,
};