const Products = require('../services/ProductsServices');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
};

async function createProducts(req, res) {
  const { name, quantity } = req.body;

  const products = await Products.createProducts(name, quantity);

  res.status(201).json(products);
}

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.getById(id);

  if (product === null) return res.status(404).send({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  createProducts,
};