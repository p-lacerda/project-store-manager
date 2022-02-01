const express = require('express');
// const bodyParser = require('body-parser');
require('dotenv').config();

const {
  validateName,
  validateQuantity,
  checkAlreadyExists,
  checkNotExists,
} = require('./middlewares/ProductsMiddleware');
const Products = require('./controllers/ProductsController');
const Sales = require('./controllers/SalesController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// PRODUCTS
app.get('/products/:id', Products.getById);
app.get('/products', Products.getAll);
app.put('/products/:id', [validateName,
  validateQuantity, checkNotExists, Products.editProducts]);
app.post('/products', [validateName,
  validateQuantity, checkAlreadyExists, Products.createProducts]);
app.delete('/products/:id', [checkNotExists, Products.deleteProducts]);

// SALES
app.post('/sales', Sales.createSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
