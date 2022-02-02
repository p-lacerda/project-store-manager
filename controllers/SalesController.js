const salesServices = require('../services/SalesService');

const createSalesProduct = async (req, res) => {
  const { body } = req;
  const id = await salesServices.createSalesProduct(body);
  
  res.status(201).json({
    id,
    itemsSold: body,
   });
};

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();

  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesServices.getById(id);

  if (sales === null) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sales);
};

module.exports = {
  createSalesProduct,
  getAll,
  getById,
};