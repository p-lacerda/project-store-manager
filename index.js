const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Products = require('./controllers/ProductsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.post('/products', Products.createProducts);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
