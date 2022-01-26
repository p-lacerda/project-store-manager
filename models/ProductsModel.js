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

const getById = async (id) => {
  const query = 'SELECT * '
  + 'FROM StoreManager.products '
  + 'WHERE id = ?';
  const params = [id];
  const [productById] = await connection.execute(query, params);
  if (productById.length === 0) return null;
  return productById[0];
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
  getById,
  createProducts,
  productsExists,
};