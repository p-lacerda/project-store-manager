const ProductServices = require('../services/ProductsServices');

const authProductSale = async (req, res, next) => {
  const { body } = req;
  const productBool = [];
  const products = await ProductServices.getAll();
  body.forEach((p) => {
    const findProduct = products.find((product) => product.id === p.product_id);

    if (!p || p.product_id === undefined || !findProduct) {
      productBool.push(false);
    }
  });
  if (productBool.includes(false)) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  next();
};
  
  const authSaleQuantity = async (req, res, next) => {
    const { body } = req;
    const countFalse = [];
  
    body.forEach(async (p) => {
      if (p.quantity === undefined) {
        countFalse.push(false);
      }
    });
    if (countFalse.includes(false)) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    next(); 
  };
  
  const authRightQuantity = async (req, res, next) => {
    const { body } = req;
    const countFalse = [];
  
    body.forEach(async (p) => {
      if (p.quantity <= 0 || typeof (p.quantity) !== 'number') {
        countFalse.push(false);
      }
    });
  
    if (countFalse.includes(false)) {
      return res.status(422).json(({ message: 
        '"quantity" must be a number larger than or equal to 1' }));
    }
    next();
  };
  
  module.exports = {
    authProductSale,
    authSaleQuantity,
    authRightQuantity,
  };