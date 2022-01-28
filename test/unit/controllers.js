const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require("../../services/ProductsServices");
const ProductsController = require("../../controllers/ProductsController");

describe("Ao chamar o controller de getAll", () => {
  describe("quando existem produtos no BD", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getAll").resolves([]);
    });

    after(() => {
      ProductsService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});


describe("Ao chamar o controller de getById", () => {
  describe("quando existem produtos no BD", async () => {
    const response = {};
    const request = { params: { id: 2 } };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getById").resolves({
        id: 2,
        name: 'produto_2',
        quantity: 15
      });
    });

    after(() => {
      ProductsService.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equals(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("quando não existem produtos no BD", async () => {
    const response = {};
    const request = { params: { id: 3 } };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getById").resolves(null);
    });

    after(() => {
      ProductsService.getById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equals(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('existe alguma propriedade de mensagem', async () => {
      await ProductsController.getById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});