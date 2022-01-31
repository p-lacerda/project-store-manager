const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../models/connection');
const ProductsModel = require('../../models/ProductsModel');

describe("testa o model de products", () => {
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
    const payload = {
      id: 4,
      name: 'produto',
      quantity: 102
    };

    const { name, quantity, id } = payload;
  
    before(async () => {
      // Referência a Marcelo Araujo - TURMA 14A - https://github.com/tryber/sd-014-a-store-manager/blob/marcSeaLow-store-manager/test/unit/models.js
      const execute = [[payload]];
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    describe("quando existe algum produto no DB", () => {
  
      it("retorna um objeto", async () => {
        const response = await ProductsModel.editProducts(name, quantity, id);
        expect(response).to.be.an('object');
      });
  
      it("possui o id, name e quantity do produto inserido", async () => {
        const response = await ProductsModel.editProducts(name, quantity, id);
        expect(response).to.have.all.keys("id", "name", "quantity");
      });
  
      it("retorna o que é esperado", async () => {
        const response = await ProductsModel.editProducts(name, quantity, id); 
        expect(response).to.deep.equal(payload);
      });
    });
  });
  

  describe("deleta algum produto no DB", () => {  
    describe("quando existe algum produto no DB", () => {
      const payload = {
        id: 1,
        name: 'produto',
        quantity: 32
      };
    
      before(async () => {
        const execute = [[payload]];
        sinon.stub(connection, "execute").resolves(execute);
    
      });

      after(async () => {
        connection.execute.restore();
      });
  
      it('deveria ser um objeto', async () => {
        const response = await ProductsModel.deleteProducts(1);
  
        expect(response).to.be.an('object');
      });
  
      it("possui o id, name e quantity do produto inserido", async () => {
        const response = await ProductsModel.deleteProducts(1);
  
        expect(response).to.have.all.keys("id", "name", "quantity");
      });
  
      it("deve retornar um objeto com os valores do product apagado", async () => {
        const response = await ProductsModel.deleteProducts(1);
  
        expect(response).to.deep.equal(payload)
      });
    });
  });
});

