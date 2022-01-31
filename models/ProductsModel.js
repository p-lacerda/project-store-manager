const connection = require('./connection');

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
  return { id: products.insertId, name, quantity };
};

const editProducts = async (name, quantity, id) => {
  await connection.execute('UPDATE StoreManager.products '
  + 'SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
  const product = await getById(id);
  return { id: product.id, name: product.name, quantity: product.quantity };
};

const deleteProducts = async (id) => {
  const product = getById(id);
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
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