const Products = require('../models/ProductsModel');

const getAll = async () => Products.getAll();

const createProducts = async (name, quantity) => {
  const products = await Products.createProducts(name, quantity);

  return products;
};

module.exports = {
  getAll,
  createProducts,
};