const Sales = require('../services/SalesService');

const createSale = async (req, res) => {
  const { body } = req;
  console.log(body, 'CONTROLLER');
  const response = await Sales.createSale(body);

  res.status(201).json(response);
};

module.exports = {
  createSale,
};