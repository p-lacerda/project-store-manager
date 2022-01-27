const Products = require('../services/ProductsServices');

const productMessages = {
  nameIsRequired: {
    message: '"name" is required',
  },
  nameLength: {
    message: '"name" length must be at least 5 characters long',
  },
  alreadyExists: {
    message: 'Product already exists',
  },
  notExists: {
    message: 'Product not found',
  },
  quantityIsRequired: {
    message: '"quantity" is required',
  },
  quantityNumber: {
    message: '"quantity" must be a number larger than or equal to 1',
  },
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).send(productMessages.nameIsRequired);

  if (name.length < 5) return res.status(422).send(productMessages.nameLength);

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) return res.status(400).send(productMessages.quantityIsRequired);

  if (typeof (quantity) !== 'number' || quantity <= 0) {
    return res.status(422).send(productMessages.quantityNumber);
  }

  next();
};

const checkAlreadyExists = async (req, res, next) => {
  const { name } = req.body;
  const products = await Products.productsExists(name);
  if (products.length > 0) {
    return res.status(409).json(productMessages.alreadyExists);
  }

  next();
};

const checkNotExists = async (req, res, next) => {
  const { id } = req.params;
  const products = await Products.getById(id);
  console.log(products);
  if (products === [] || products === null) {
    return res.status(404).json(productMessages.notExists);
  }

  next();
};

module.exports = {
  validateName,
  validateQuantity,
  checkAlreadyExists,
  checkNotExists,
};