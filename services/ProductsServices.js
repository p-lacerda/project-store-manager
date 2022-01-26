const Products = require('../models/ProductsModel');

const getAll = async () => Products.getAll();

const getById = async (id) => Products.getById(id);

const createProducts = async (name, quantity) => {
  const products = await Products.createProducts(name, quantity);

  return products;
};

const productsExists = async (name) => Products.productsExists(name);

module.exports = {
  getAll,
  getById,
  createProducts,
  productsExists,
};