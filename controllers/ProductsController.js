const Products = require('../services/ProductsServices');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(201).json(products);
};

async function createProducts(req, res) {
  const { name, quantity } = req.body;

  const products = await Products.createProducts(name, quantity);

  res.status(201).json(products);
}

module.exports = {
  getAll,
  createProducts,
};