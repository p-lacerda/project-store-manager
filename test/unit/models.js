const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/ProductsModel');

describe("consulta de todos os produtos do DB", () => {
  describe("quando não existe produto criado em products/", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });
    it("retorna array vazio", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.empty;
    });
  });

  describe("quando existe produto criado em products/", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([[
      {
        id: 1,
        name: "produto",
        quantity: 10
      },
      {
        id: 2,
        name: "produto_2",
        quantity: 35
      }
    ]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });
  
    it("o array não está vazio", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.not.empty;
    });

    it("o array tem as chaves id, name e quantity", async () => {
      const [products] = await ProductsModel.getAll();
      expect(products).to.include.all.keys("id","name", "quantity");
    });


  });
});

describe("consulta de produtos do DB por id", () => {


  describe("quando existe produto criado em products/:id", () => {
    before(async () => {

      sinon.stub(connection, "execute").returns([
      [{
        id: 1,
        name: "produto",
        quantity: 10
      }]
    ]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("retorna objeto", async () => {
      const response = await ProductsModel.getById();
      expect(response).to.be.an('object');
    });
  
    it("o objeto não está vazio", async () => {
      const response = await ProductsModel.getById();
      expect(response).to.be.not.empty;
    });

    it("contem as chaves id, name e quantity", async () => {
      const response = await ProductsModel.getById();
      expect(response).to.contain.keys('id', 'name', 'quantity');
    });
  });

  describe("quando não existe produto criado em products/:id", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([[]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });
    it("retorna array vazio", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.empty;
    });
  });
});