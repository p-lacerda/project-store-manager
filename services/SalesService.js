const salesModel = require('../models/SalesModel');

const createSalesProduct = async (body) => {
  const id = await salesModel.createSale();

  body.map(async ({ product_id: productId, quantity }) => {
   salesModel.createSalesProduct({ productId, quantity, id });
  });

  return id;
};

module.exports = {
  createSalesProduct,
};