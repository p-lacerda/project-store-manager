const salesServices = require('../services/SalesService');

const createSalesProduct = async (req, res) => {
  const { body } = req;
  const id = await salesServices.createSalesProduct(body);
  
  res.status(201).json({
    id,
    itemsSold: body,
   });
};

const getAll = async (req, res) => {
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (id) return res.send('')
};

module.exports = {
  createSalesProduct,
  getAll,
  getById
};