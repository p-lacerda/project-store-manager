const { expect } = require('chai');
const sinon = require('sinon');

const Products = require('../../services/ProductsServices');
const ProductsModel = require('../../models/ProductsModel');

describe('Insere um novo filme no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadProduct = {
      name: "product_name1",
      quantity: 10
    }

    before(() => {
      sinon.stub(ProductsModel, 'createProducts')
        .resolves(false);
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.createProducts.restore();
    });

    it('retorna um boolean', async () => {
      const response = await Products.createProducts(payloadProduct);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await Products.createProducts(payloadProduct);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const payloadProduct = {
      name: "product_name1",
      quantity: 10
    }

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(ProductsModel, 'createProducts')
        .resolves({ id: ID_EXAMPLE });
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.createProducts.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Products.createProducts(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await Products.createProducts(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });
});