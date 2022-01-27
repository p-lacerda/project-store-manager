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
  console.log(productById);
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

const editProducts = async (name, quantity, id) => {
  const query = 'UPDATE StoreManager.products '
  + 'SET name = ?, quantity = ? WHERE id = ?';
  const params = [name, quantity, id];
  await connection.execute(query, params);
  const searchProduct = await getById(id);
  return searchProduct;
};

const deleteProducts = async (id) => {
  const product = await getById(id);
  const query = 'DELETE FROM StoreManager.products '
  + 'WHERE id = ?';
  const params = [id];
  await connection.execute(query, params);

  return product;
};

module.exports = {
  getAll,
  getById,
  createProducts,
  editProducts,
  productsExists,
  deleteProducts,
};