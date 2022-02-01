const Sales = require('../models/SalesModel');

const createSale = async (body) => {
  await Sales.createSale(body);
};

module.exports = {
  createSale,
};