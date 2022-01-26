const express = require('express');
// const bodyParser = require('body-parser');
require('dotenv').config();
const {
  validateName,
  validateQuantity,
  checkExists,
} = require('./middlewares/ProductsMiddleware');
const Products = require('./controllers/ProductsController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', Products.getById);
app.get('/products', Products.getAll);
app.post('/products', [validateName,
  validateQuantity, checkExists, Products.createProducts]);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
