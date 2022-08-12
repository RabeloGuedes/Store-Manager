const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const productsModels = require('../../../models/products');
const productsServices = require('../../../services/products');

describe('Testa a camada de service de products.', () => {
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
  const newFakeProduct = {
    name: "Armadura do homem de ferro"
  }
  const erroMessage = { message: "Product not found" };
  const response = (res, codeValue) => ({
    response: res,
    code: { code: codeValue },
  });
  beforeEach(sinon.restore);

  describe('Testa a função getAllProducts', () => {
    it("Testa se chamando a função getAllProducts recebe o array com todos os produtos.", async () => {
      sinon.stub(productsModels, 'getAllProducts').resolves(fakeProducts);
      const allProducts = await productsServices.getAllProducts();

      expect(allProducts).to.be.an('array');
      expect(allProducts).to.be.equal(fakeProducts);
    });
  });

  describe("Testa a função getProductById", () => {
    it("Testa se chamando a função getProductById recebe o produto correto.", async () => {
      sinon.stub(productsModels, "getProductById").resolves(response(fakeProduct, 200));
      const product = await productsServices.getProductById(1);

      expect(product).to.be.an("object");
      expect(product.response.response).to.have.all.keys('id', 'name');
      expect(product.response.code).to.have.all.keys("code");
      expect(product.response.response.id).to.be.equal(fakeProduct.id);
      expect(product.response.response.name).to.be.equal(fakeProduct.name);
      expect(product.code.code).to.be.equal(200);
    });

    it("Testa se chamando a função getProductById com um id inexistente recebe a mensagem de error correta como resposta.", async () => {
      sinon.stub(productsModels, "getProductById").resolves(response(erroMessage, 404));
      const product = await productsServices.getProductById(4);
      expect(product).to.be.an("object");
      expect(product.response.response).to.have.all.keys("message");
      expect(product.response.response.message).to.be.equal(erroMessage.message);
      expect(product.response.code).to.have.all.keys("code");
      expect(product.response.code.code).to.be.equal(404);
    });

    it("Testa se chamando a função getProductById recebe um valor diferente de undefined como resposta.", async () => {
      sinon.stub(productsModels, "getProductById").resolves(undefined);
      const product = await productsServices.getProductById(1);
      expect(product).to.be.not.undefined;
    });

  // describe("Testa a função createProduct", () => {
    
  //   it("Testa se chamando a função createProduct recebe um objeto com chaves 'id' e 'name.", async () => {
  //     sinon.stub(productsModels, "createProduct").resolves(response(newFakeProduct, 201));
  //     const product = await productsServices.createProduct();

  //     expect(product).to.be.an("array");
  //     expect(product).to.be.equal(fakeProducts);
  //   });
  // });
  });
});
