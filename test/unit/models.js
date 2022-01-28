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

      sinon.stub(connection, "execute").returns([{}]);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('object');
    });
    it("retorna array vazio", async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.empty;
    });
  });

  describe("quando é passado um id que não existe em products/:id", () => {
    before(() => {

      sinon.stub(connection, "execute").returns([[null]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await ProductsModel.getById();
      expect(response).to.be.null;
    });

  });
});

describe("cria algum produto no DB", () => {
  describe("quando é inserido com sucesso", () => {
    const payloadProducts = {
      name: 'produto',
      quantity: 38,
    };

    before(() => {
      const execute = [{ insertId: 1 }];
      
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsModel.createProducts(payloadProducts);

      expect(response).to.be.an('object')
    });

    it("possui o id, name e quantity do produto inserido", async () => {
      const response = await ProductsModel.createProducts(payloadProducts);

      expect(response).to.have.all.keys("id", "name", "quantity")
    });
  });
})

describe("edita algum produto no DB", () => {
  describe("quando existe algum produto no DB", () => {
    const payloadProducts = {
      name: 'produto',
      quantity: 30
    }

    const execute = {
      id: 1,
      name: 'produto_changed',
      quantity: 50
    };

    before(async () => {
      sinon.stub(ProductsModel, "createProducts").resolves(payloadProducts);
      await ProductsModel.createProducts();
      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      ProductsModel.createProducts.restore();
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const { name, quantity, id } = execute;
      const response = await ProductsModel.editProducts(name, quantity, id);

      expect(response).to.be.an('object')
    });

    it("possui o id, name e quantity do produto inserido", async () => {
      const { name, quantity, id } = execute;
      const response = await ProductsModel.editProducts(name, quantity, id);

      expect(response).to.have.all.keys("id", "name", "quantity")
    });

    it("name ou quantity são alterados após adicionar um dado novo", async () => {
      const { name, quantity, id } = execute;
      const response = await ProductsModel.editProducts(name, quantity, id);

      expect(response.name).to.be.equal('produto_changed');
      expect(response.quantity).to.be.equal(50);
    });
  });
});

describe("deleta algum produto no DB", () => {
  describe("quando existe algum produto no DB", () => {

  });
});