const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const rescue = require('express-rescue');
const errorMiddleware = require('./middlewares/error');
const Products = require('./controllers/ProductsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(Products.getAll));
app.post('/products', rescue(Products.createProducts));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
