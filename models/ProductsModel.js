const connection = require('./connection');

const getNewProducts = (products) => {
  const { id, name, quantity } = products;

  return {
    id,
    name,
    quantity,
  };
};

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const productsExists = async (name) => {
  const query = 'SELECT * '
  + 'FROM StoreManager.products '
  + 'WHERE name = ?';
  const params = [name];
  const [products] = await connection.execute(query, params);
  return products;
};

const createProducts = async (name, quantity) => {
  const [products] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return getNewProducts({ id: products.insertId, name, quantity });
};

module.exports = {
  getAll,
  createProducts,
  productsExists,
};