const { describe } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/products');
const connection = require('../../../models/connection');

describe('Testa a camada models de produtos', () => {
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
  const updatedFakeProducts = [
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
    {
      id: 4,
      name: "Armadura do homem ferro",
    },
  ];

  const newProductInfos = {
    id: 1,
    name: "Machado de Thor Stormbreaker"
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

  describe("Testa a função createProduct", () => {
    it("Verifica se o retorno da função createProduct é um objeto com chaves 'id' e 'name'.", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
      const product = await productsModels.createProduct(updatedFakeProducts[3].name);
      expect(product).to.be.an("object").that.has.all.keys("id", "name");
      expect(product.id).to.be.equal(4);
      expect(product.name).to.be.equal(updatedFakeProducts[3].name);
    });
  });

  describe("Testa a função updateProduct", () => {
    it("Verifica se a função updateProduct cadastra a atualização.", async () => {
      sinon.stub(connection, "execute").resolves();
      await productsModels.updateProduct(newProductInfos.name, newProductInfos.id);
    });
  });

  describe("Testa a função deleteProduct", () => {
      it("Verifica se a função deleteProduct remove o item requerido corretamente.", async () => {
      const productToBeDeleted = { id: 1, name: "Machado de Thor Stormbreaker"};
      sinon.stub(connection, "execute").resolves();
      await productsModels.deleteProduct(productToBeDeleted.id);
    });
  });

  describe("Testa a função getProductBySearch", () => {
      it("Verifica se a função getProductBySearch retorna o item requerido corretamente.", async () => {
        const fakeProduct = { id: 1, name: "Machado de Thor Stormbreaker" };
        const name = "machado"
        sinon.stub(connection, "execute").resolves([fakeProduct]);
        const product = await productsModels.getProductBySearch(name);
        expect(product).to.has.all.keys('id', 'name');
        expect(product.id).to.be.equal(fakeProduct.id);
        expect(product.name).to.be.equal(fakeProduct.name);
    });
  });
})