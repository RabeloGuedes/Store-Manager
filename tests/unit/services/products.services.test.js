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
  });

  describe("Testa a função createProduct", () => {
    
    it("Testa se chamando a função createProduct recebe um objeto com chaves 'reponse' contendo chaves 'id' e 'name e outra chamada 'code' contendo uma chave 'code'.", async () => {
      const newProduct = { id: 4, name: "Armadura do homem de ferro" };
      sinon.stub(productsModels, "createProduct").resolves(newProduct);
      const product = await productsServices.createProduct(newProduct.name);

      expect(product.response).to.be.an("object").that.has.all.keys('id', 'name');
      expect(product.response.id).to.be.equal(4);
      expect(product.response.name).to.be.equal(newProduct.name);
      expect(product.code).to.be.an("object").that.has.all.keys('code');
      expect(product.code.code).to.be.equal(201);
    });
    it("Testa se chamando a função createProduct, sem passar um nome, recebe um objeto com chaves 'reponse' contendo a chave 'message' e outra chamada 'code' contendo uma chave 'code'.", async () => {
      const expectedResponse = response({ message: '"name" is required' }, 400);
      sinon.stub(productsModels, "createProduct").resolves();
      const product = await productsServices.createProduct();

      expect(product.response).to.be.an("object").that.has.all.keys('message');
      expect(product.response.message).to.be.equal(expectedResponse.response.message);
      expect(product.code).to.be.an("object").that.has.all.keys('code');
      expect(product.code.code).to.be.equal(expectedResponse.code.code);
    });
    it("Testa se chamando a função createProduct, passando um nome com menos que cinco caracteres, recebe um objeto com chaves 'reponse' contendo a chave 'message' e outra chamada 'code' contendo uma chave 'code'.", async () => {
      const expectedResponse = response({ message: '"name" length must be at least 5 characters long' }, 422);
      sinon.stub(productsModels, "createProduct").resolves();
      const product = await productsServices.createProduct("name");

      expect(product.response).to.be.an("object").that.has.all.keys('message');
      expect(product.response.message).to.be.equal(expectedResponse.response.message);
      expect(product.code).to.be.an("object").that.has.all.keys('code');
      expect(product.code.code).to.be.equal(expectedResponse.code.code);
    });
  });

  describe("Testa a função updateProduct", () => {
    
    it("Testa se chamando a função updateProduct, em caso de sucesso, recebe os dados atualizados.", async () => {
      const newProductInfos = { id: 1, name: "Machado de Thor Stormbreaker" };
      sinon.stub(productsModels, "updateProduct").resolves();
      const product = await productsServices.updateProduct({ id } = newProductInfos, { name } = newProductInfos);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.an('object').that.has.all.keys('id', 'name');
      expect(product.response.id).to.be.a('number').that.is.equal(newProductInfos.id);
      expect(product.response.name).to.be.a('string').that.is.equal(newProductInfos.name);
    });

    it("Testa se chamando a função updateProduct, em caso de falha quando o campo name é inexsitente, recebe a mensagem de erro correta.", async () => {
      const newProductInfos = { id: 1, name: "Machado de Thor Stormbreaker" };
      sinon.stub(productsModels, "updateProduct").resolves();
      const error = { response: { message: '"name" is required' }, code: { code: 400 } };
      const product = await productsServices.updateProduct({ id } = newProductInfos, {});

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.an('object').that.has.all.keys('message');
      expect(product.code).to.be.an('object').that.has.all.keys('code');
      expect(product.response.message).to.be.a('string').that.is.equal(error.response.message);
      expect(product.code.code).to.be.a('number').that.is.equal(error.code.code);
    });

    it("Testa se chamando a função updateProduct, em caso de falha quando o campo name é inválido, recebe a mensagem de erro correta.", async () => {
      const newProductInfos = { id: 1, name: "Mac" };
      const error = { response: { message: '"name" length must be at least 5 characters long' },
      code: { code: 422 } };
      const product = await productsServices.updateProduct({ id } = newProductInfos, { name } = newProductInfos);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.an('object').that.has.all.keys('message');
      expect(product.code).to.be.an('object').that.has.all.keys('code');
      expect(product.response.message).to.be.a('string').that.is.equal(error.response.message);
      expect(product.code.code).to.be.a('number').that.is.equal(error.code.code);
    });

    it("Testa se chamando a função updateProduct, em caso de falha quando o id é inválido, recebe a mensagem de erro correta.", async () => {
      const newProductInfos = { id: 999, name: "Machado de Thor Stormbreaker" };
      const error = { response: { message: 'Product not found' }, code: { code: 404 } };
      const product = await productsServices.updateProduct({ id } = newProductInfos, { name } = newProductInfos);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.an('object').that.has.all.keys('message');
      expect(product.code).to.be.an('object').that.has.all.keys('code');
      expect(product.response.message).to.be.a('string').that.is.equal(error.response.message);
      expect(product.code.code).to.be.a('number').that.is.equal(error.code.code);
    });
  });

  describe("Testa a função deleteProduct", () => {
    
    it("Testa se chamando a função deleteProduct, em caso de sucesso, o produto é deletado.", async () => {
      const productToBeDeleted = { id: 1, name: "Machado de Thor Stormbreaker" };
      const responseOK = { response: '', code: { code: 204 } };
      sinon.stub(productsModels, "deleteProduct").resolves(productToBeDeleted.id);
      const product = await productsServices.deleteProduct({ id } = productToBeDeleted);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response).to.be.a('string').that.is.equal(responseOK.response);
      expect(product.code).to.be.a('number').that.is.equal(responseOK.code.code);
    });

    it("Testa se chamando a função deleteProduct, em caso de falha, a mensagem de erro correta é mostrada.", async () => {
      const productToBeDeleted = { id: 999, name: "Machado de Thor Stormbreaker" };
      const reponseFailed = { response: { message: 'Product not found' }, code: { code: 404 } };
      sinon.stub(productsModels, "deleteProduct").resolves(productToBeDeleted.id);
      const product = await productsServices.deleteProduct({ id } = productToBeDeleted);

      expect(product).to.be.an('object').that.has.all.keys('response', 'code');
      expect(product.response.message).to.be.a('string').that.is.equal(reponseFailed.response.message);
      expect(product.code).to.be.a('number').that.is.equal(reponseFailed.code.code);
    });
  });
});
