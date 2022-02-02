const salesModel = require('../models/SalesModel');

const createSalesProduct = async (body) => {
  const { id } = await salesModel.createSale();

  await Promise.all(body.map(async ({ product_id: productId, quantity }) => {
   await salesModel.createSalesProduct({ productId, quantity, id });
  }));

  return id;
};

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);

  return sales;
};

module.exports = {
  createSalesProduct,
  getAll,
  getById,
};