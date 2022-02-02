const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require("../../services/ProductsServices");
const ProductsController = require("../../controllers/ProductsController");

const SalesController = require("../../controllers/SalesController");
const SalesServices = require("../../services/SalesService");


describe("testa os controllers de products", () => {
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

  describe("Ao chamar o controller de createProducts", () => {
    describe("quando existe um produto no DB", () => {
      const payload = {
        id: 1,
        name: 'produto',
        quantity: 10
      };

      const response = {};
      const request = { body: {} };
  
      before(() => {
        request.body = { name: "produto", quantity: 10 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();
  
        sinon.stub(ProductsService, "createProducts").resolves(payload);
      });
  
      after(() => {
        ProductsService.createProducts.restore();
      });

      it('é chamado o método "status" passando o código 201', async () => {
        await ProductsController.createProducts(request, response);
        expect(response.status.calledWith(201)).to.be.equals(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await ProductsController.createProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe("Ao chamar o controller de editProducts", () => {
    describe("quando existe um produto no DB", () => {
      const payload = {
        id: 1,
        name: 'produto',
        quantity: 10
      };

      const { id, name, quantity } = payload;

      const response = {};
      const request = { params: { id } };
  
      before(() => {
        request.body = { name, quantity };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();
  
        sinon.stub(ProductsService, "editProducts").resolves(payload);
      });
  
      after(() => {
        ProductsService.editProducts.restore();
      });

      it('é chamado o método "status" passando o código 201', async () => {
        await ProductsController.editProducts(request, response);
        expect(response.status.calledWith(200)).to.be.equals(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await ProductsController.editProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });

  describe("Ao chamar o controller de deleteProducts", () => {
    describe("quando existe um produto no DB", () => {
      const payload = {
        id: 1,
        name: 'produto',
        quantity: 10
      };

      const { id, name, quantity } = payload;

      const response = {};
      const request = { params: { id } };
  
      before(() => {
        request.body = { name, quantity };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();
  
        sinon.stub(ProductsService, "deleteProducts").resolves(payload);
      });
  
      after(() => {
        ProductsService.deleteProducts.restore();
      });

      it('é chamado o método "status" passando o código 201', async () => {
        await ProductsController.deleteProducts(request, response);
        expect(response.status.calledWith(200)).to.be.equals(true);
      });
  
      it('é chamado o método "json" passando um objeto', async () => {
        await ProductsController.deleteProducts(request, response);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});

describe('testa os controllers de sales', () => {

  describe("Ao chamar o controller de createProductsSale", () => {
    describe("quando existe um produto no BD", () => {
      const payload = {
        id: 1,
        name: 'product',
        quantity: 15
      };

      const response = {};
      const request = { body: {} };

      before(() => {
        request.body = { product_id: 1, quantity: 15 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();

        sinon.stub(SalesServices, "createSalesProduct").resolves(1);
      });

      after(() => {
        SalesServices.createSalesProduct.restore();
      });

      it('é chamado o status com o código 201', async () => {
        await SalesController.createSalesProduct(request, response);

        expect(response.status.calledWith(201)).to.be.equals(true);
      });

      it('é chamado o json com um objeto', async () => {
        await SalesController.createSalesProduct(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});
