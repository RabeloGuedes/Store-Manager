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
  const newFakeProduct = {
    name: "Armadura do homem de ferro"
  }
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
      const fakeProduct = { id: 1, name: "Martelo do Thor Mjölnir" }
      sinon.stub(productsModels, "getProductById").resolves([fakeProduct]);
      const product = await productsServices.getProductById(fakeProduct.id);

      expect(product).to.be.an("object");
      expect(product).to.have.all.keys('response', 'code');
    });

  });

  describe("Testa a função createProduct", () => {
    
    it("Testa se chamando a função createProduct recebe um objeto com chaves 'reponse' contendo chaves 'id' e 'name e outra chamada 'code' contendo uma chave 'code'.", async () => {
      const newProduct = { id: 4, name: "Armadura do homem de ferro" };
      sinon.stub(productsModels, "createProduct").resolves(newProduct);
      const product = await productsServices.createProduct(newProduct.name);

      expect(product.response).to.be.an("object").that.has.all.keys('id', 'name');
      expect(product.response.id).to.be.equal(4);
      expect(product.response.name).to.be.equal(newProduct.name);
      expect(product.code).to.be.a("number").that.is.equal(201);
    });

  });

  describe("Testa a função updateProduct", () => {
    
    it("Testa se chamando a função updateProduct, em caso de sucesso, recebe os dados atualizados.", async () => {
      const newProductInfos = { id: 1, name: "Machado de Thor Stormbreaker" };
      sinon.stub(productsModels, "updateProduct").resolves();
      const product = await productsServices.updateProduct({ id } = newFakeProduct, { name } = newFakeProduct);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.an('object').that.has.all.keys('id', 'name');
    });

  });

  describe("Testa a função deleteProduct", () => {
    
    it("Testa se chamando a função deleteProduct, em caso de sucesso, o produto é deletado.", async () => {
      const productToBeDeleted = { id: 1, name: "Machado de Thor Stormbreaker" };
      const responseOK = { response: '', code: 204 };
      sinon.stub(productsModels, "deleteProduct").resolves(productToBeDeleted.id);
      const product = await productsServices.deleteProduct({ id } = productToBeDeleted);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.a('string').that.is.equal(responseOK.response);
      expect(product.code).to.be.a('number').that.is.equal(responseOK.code);
    });
  });

  describe("Testa a função getProductBySearch", () => {
    
    it("Testa se chamando a função getProductBySearch, todos os produtos são retornados.", async () => {
      const request = { };
      request.query = { q: '' };
      sinon.stub(productsModels, "getProductBySearch").resolves();
      const allProducts = await productsServices.getProductBySearch(request);

      expect(allProducts).to.be.an('object');
    });

  it("Testa se chamando a função getProductBySearch, todos os produtos são retornados.", async () => {
      const searchedProduct = { id: 1, name: "Machado de Thor Stormbreaker" };
      const request = { };
      request.query = { q: 'machado' };
      sinon.stub(productsModels, "getProductBySearch").resolves();
      const products = await productsServices.getProductBySearch(request);

      expect(products).to.be.an('object');
    });

  });
});
