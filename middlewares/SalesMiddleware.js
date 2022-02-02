const authProductSale = async (req, res, next) => {
    const { body } = req;
    const thisBu = [];
    body.forEach(async (p) => {
      // const productIdEx = await storeServices.getProductId(p.product_id);
      // console.log(await productIdEx);
      if (p.product_id === undefined) {
        thisBu.push(false);
      }
    });
    if (thisBu.includes(false)) {
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