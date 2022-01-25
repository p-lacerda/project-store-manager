const Products = require('../services/ProductsServices');
const { 
  GetProductsValidation,
} = require('./utils');

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(201).json(products);
};

async function createProducts(req, res, next) {
  const { name, quantity } = req.body;

  const { error, errorCode } = GetProductsValidation(name, quantity);

  // Coloca o erro no req para poder ser acessado no middleware de erro
  req.errorCode = errorCode;
  
  if (error) {
    return next(error);
  }

  const products = await Products.createProducts(name, quantity);

  // Caso haja erro na criação da pessoa autora, iniciamos o fluxo de erro
  if (products.error) return next(products.error);

  res.status(201).json(products);
}

module.exports = {
  getAll,
  createProducts,
};