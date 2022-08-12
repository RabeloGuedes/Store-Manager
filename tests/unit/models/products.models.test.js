const { describe } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/products');
const connection = require('../../../models/connection');

describe('Testa conectividade com o banco de dados produtos', () => {
  const fakeProducts = [
    {
      id: 1,
      name: "Martelo de Thor",
    },
    {
      id: 2,
      name: "Traje de encolhimento",
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
    },
  ];
  const fakeProduct = {
    id: 1,
    name: "Martelo de Thor",
  };
  beforeEach(sinon.restore);
  describe('Testa a função getAllProducts', () => {
    it('Verifica se o retorno da função getAllProducts é um array de não vazio.', async () => {
      sinon.stub(connection, 'execute').resolves([fakeProducts]);
      const allProdcuts = await productsModels.getAllProducts();

      expect(allProdcuts).to.be.an('array').that.is.not.empty;
    });
    it("Verifica se o retorno da função getAllProducts é um array de objetos.", async () => {
      sinon.stub(connection, "execute").resolves([fakeProducts]);
      const allProdcuts = await productsModels.getAllProducts();

      expect(allProdcuts).to.be.an("array").that.is.equal(fakeProducts);
    });
  });

  describe("Testa a função getProductById", () => {
    it("Verifica se o retorno da função getProductById é um objeto com chaves 'id' e 'name'.", async () => {
      sinon.stub(connection, "execute").resolves([fakeProducts]);
      const product = await productsModels.getProductById(1);

      expect(product).to.be.an("object").that.is.not.empty;
      expect(product).to.be.an("object").that.has.all.keys('id', 'name');
    });
  });
})