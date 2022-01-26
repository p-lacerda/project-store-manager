const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/ProductsModel');

describe('Insere um novo produto', () => {
  const payloadProduct = {
    name: "product_name1",
    quantity: 10
  }

  before(async () => {
    const execute = [{ insertId: 1 }]; // retorno esperado nesse teste

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await ProductsModel.createProducts(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('possui o id do produto no objeto', async () => {
      const response = await ProductsModel.createProducts(payloadProduct);

      expect(response).to.have.a.property('id')
    });
  });
});