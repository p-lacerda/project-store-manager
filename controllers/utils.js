const Joi = require('joi');

// err.context = {
//   errorCode: 407,
// };

const GetProductsValidation = (name, quantity, _id) => {
  let errorCode;

  const { error } = Joi.object({
    name: Joi.string().min(5).required().error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            errorCode = 400;
            break;
          default:
            break;
        }
      });
      return errors;
    }), 
    quantity: Joi.number().not().empty().required(),
  })
    .validate({ name, quantity });

  return { error, errorCode };
};

module.exports = {
  GetProductsValidation,
};