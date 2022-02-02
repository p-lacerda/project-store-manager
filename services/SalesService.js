const salesModel = require('../models/SalesModel');

const createSalesProduct = async (body) => {
  const { id } = await salesModel.createSale();

  await Promise.all(body.map(async ({ product_id: productId, quantity }) => {
   await salesModel.createSalesProduct({ productId, quantity, id });
  }));

  return id;
};

module.exports = {
  createSalesProduct,
};