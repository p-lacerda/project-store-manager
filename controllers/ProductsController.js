const Products = require('../services/ProductsServices');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
};

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const products = await Products.createProducts(name, quantity);

  res.status(201).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.getById(id);

  if (product === null) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const editProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const product = await Products.editProducts(name, quantity, id);

  res.status(200).json(product);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  const product = await Products.deleteProducts(id);

  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  createProducts,
  editProducts,
  deleteProducts,
};