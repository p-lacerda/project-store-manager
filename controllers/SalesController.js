const salesServices = require('../services/SalesService');

const createSalesProduct = async (req, res) => {
  const { body } = req;
  const id = await salesServices.createSalesProduct(body);
  
  res.status(201).json({
    id,
    itemsSold: body,
   });
};

module.exports = {
  createSalesProduct,
};