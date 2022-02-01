const Products = require('../models/ProductsModel');

const getAll = async () => Products.getAll();

const getById = async (id) => Products.getById(id);

const deleteProducts = async (id) => Products.deleteProducts(id);

const editProducts = async (name, quantity, id) => {
  const product = await Products.editProducts(name, quantity, id);
  return product;
};

const createProducts = async (name, quantity) => {
  const products = await Products.createProducts(name, quantity);

  return products;
};

const productsExists = async (name) => Products.productsExists(name);

module.exports = {
  getAll,
  getById,
  editProducts,
  createProducts,
  productsExists,
  deleteProducts,
};