const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../services/ProductsServices');
const ProductsModel = require('../../models/ProductsModel');

describe("consulta de todos os produtos do DB no services", () => {
  describe("quando não existe produto criado em products/", () => {
    before(() => {
      sinon.stub(ProductsModel, 'getAll')
        .resolves([]);
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.getAll.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsServices.getAll();
      expect(response).to.be.an('array');
    });
    it("retorna array vazio", async () => {
      const response = await ProductsServices.getAll();
      expect(response).to.be.empty;
    });
  });

  describe("quando existe produto criado em products/", () => {
    before(() => {
      sinon.stub(ProductsModel, 'getAll')
        .resolves([{
          id: 1,
          name: 'product',
          quantity: 10,
        }]);
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.getAll.restore();
    });

    it("retorna array", async () => {
      const response = await ProductsServices.getAll();
      expect(response).to.be.an('array');
    });
  
    it("o array não está vazio", async () => {
      const response = await ProductsServices.getAll();
      expect(response).to.be.not.empty;
    });

    it("o array tem as chaves id, name e quantity", async () => {
      const [products] = await ProductsServices.getAll();
      expect(products).to.include.all.keys("id","name", "quantity");
    });
  });
});

describe("consulta de produtos do DB por id em services", () => {
  describe("quando existe produto criado em products/:id", () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById')
        .resolves({
          id: 1,
          name: 'produto',
          quantity: 15
        });
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.getById.restore();
    });

    it("retorna objeto", async () => {
      const response = await ProductsServices.getById();
      expect(response).to.be.an('object');
    });
  
    it("o objeto não está vazio", async () => {
      const response = await ProductsServices.getById();
      expect(response).to.be.not.empty;
    });

    it("contem as chaves id, name e quantity", async () => {
      const response = await ProductsServices.getById();
      expect(response).to.contain.keys('id', 'name', 'quantity');
    });
  });

  describe("quando não existe produto criado em products/:id", () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById')
        .resolves({});
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.getById.restore();
    });
    it("retorna array", async () => {
      const response = await ProductsServices.getById();
      expect(response).to.be.an('object');
    });

    it("retorna array vazio", async () => {
      const response = await ProductsServices.getById();
      expect(response).to.be.empty;
    });
  });

  describe("quando é passado um id que não existe em products/:id", () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById')
        .resolves(null);
    });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      ProductsModel.getById.restore();
    });

    it('retorna null', async () => {
      const response = await ProductsServices.getById();
      expect(response).to.be.null;
    });

  });
});

describe("cria algum produto", () => {
  const payload = {
    id: 1,
    name: 'produto',
    quantity: 38,
  };

  before(() => {
    sinon.stub(ProductsModel, "createProducts").resolves(payload);
  });

  after(() => {
    ProductsModel.createProducts.restore();
  });

  const { name, quantity } = payload;

  describe("quando é inserido com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await ProductsServices.createProducts(name, quantity);

      expect(response).to.be.an('object')
    });

    it("possui o id, name e quantity do produto inserido", async () => {
      const response = await ProductsServices.createProducts(name, quantity);

      expect(response).to.have.all.keys("id", "name", "quantity")
    });
  });
});

describe("edita algum produto", () => {
  const payload = {
    id: 3,
    name: 'produto',
    quantity: 210,
  };

  before(() => {
    sinon.stub(ProductsModel, "editProducts").resolves(payload);
  });

  after(() => {
    ProductsModel.editProducts.restore();
  });

  const { name, quantity, id } = payload;

  describe("quando é editado com sucesso", () => {
    it("retorna um objeto", async () => {
      const response = await ProductsServices.editProducts(name, quantity, id);
      expect(response).to.be.an('object')
    });

    it("possui o id, name e quantity do produto inserido", async () => {
      const response = await ProductsServices.editProducts(name, quantity, id);

      expect(response).to.have.all.keys("id", "name", "quantity")
    });
  });
});