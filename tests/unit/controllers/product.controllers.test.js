const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../services/products');
const productControllers = require('../../../controllers/products');

describe('Testa a camada de controllers de products.', () => {
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
  const req = {};
  const res = {};
  const erroMessage = { message: "Product not found" };
  const newProduct = { id: 4, name: "Armadura do homem de ferro" };
  const response = (res, codeValue) => ({
    response: res,
    code: { code: codeValue },
  });
  beforeEach(sinon.restore);

  describe("Testa a função getAllProducts em caso de sucesso.", () => {
    it("Testa se chamando a função getAllProducts recebe o array com todos os produtos.", async () => {
      sinon.stub(productsServices, 'getAllProducts').resolves(fakeProducts);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productControllers.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(fakeProducts)).to.be.equal(true);
    });
  });

  describe("Testa a função getProductById em caso de sucesso.", () => {
    it("Testa se chamando a função getProductById recebe o produto correto.", async () => {
      sinon.stub(productsServices, "getProductById").resolves(response(fakeProducts[0], 200));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 1 };
      await productControllers.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(fakeProducts[0])).to.be.equal(true);
    });
  });

  describe("Testa a função getProductById em caso de falha.", () => {
    it("Testa se chamando a função getProductById recebe a menssagem de erro.", async () => {
      sinon.stub(productsServices, "getProductById").resolves(response(erroMessage, 404));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 4 };
      await productControllers.getProductById(req, res);
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(erroMessage)).to.be.equal(true);
    });
  });

  describe("Testa a função createProduct em caso de sucesso.", () => {
    it("Testa se chamando a função createProduct recebe um objeto com chaves 'id' e 'name'.", async () => {
      sinon.stub(productsServices, "createProduct").resolves(response(newProduct, 201));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: newProduct.name };
      await productControllers.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(newProduct)).to.be.equal(true);
    });
  });

  describe("Testa a função createProduct em caso de falha, quando o nome não é passado.", () => {
    it("Testa se chamando a função createProduct recebe um objeto com chaves 'response' contendo a chave 'message' e 'code' contendo a chave 'code'.", async () => {
      const erroMessage = { message: '"name" is required' };
      sinon.stub(productsServices, "createProduct").resolves(response(erroMessage, 400));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: "" };
      await productControllers.createProduct(req, res);
      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(res.json.calledWith(erroMessage)).to.be.equal(true);
    });
  });

  describe("Testa a função createProduct em caso de falha, quando o nome não é passado.", () => {
    it("Testa se chamando a função createProduct recebe um objeto com chaves 'response' contendo a chave 'message' e 'code' contendo a chave 'code'.", async () => {
      const erroMessage = { message: '"name" length must be at least 5 characters long' };
      sinon.stub(productsServices, "createProduct").resolves(response(erroMessage, 422));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: "name" };
      await productControllers.createProduct(req, res);
      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith(erroMessage)).to.be.equal(true);
    });
  });

  describe("Testa a função updateProduct em caso de sucesso.", () => {
    it("Testa se chamando a função updateProduct recebe um objeto com chaves 'id' e 'name'.", async () => {
      const updateProduct = { response: { id: 1, name: "Machado de Thor Stormbreaker" }, code: { code: 200 } };
      sinon.stub(productsServices, "updateProduct").resolves(updateProduct);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: updateProduct.response.name };
      req.params = { id: updateProduct.response.id };
      await productControllers.updateProduct(req, res);
      expect(res.status.calledWith(updateProduct.code.code)).to.be.equal(true);
      expect(res.json.calledWith(updateProduct.response)).to.be.equal(true);
    });
  });

  describe("Testa a função updateProduct em caso de falha, quando o campo 'name' é inexistente.", () => {
    it("Testa se chamando a função updateProduct recebe um objeto com chave 'message'.", async () => {
      const errorMessage = { response: { message: '"name" is required' }, code: { code: 400 } };
      const productId = 1;
      sinon.stub(productsServices, "updateProduct").resolves(errorMessage);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: undefined };
      req.params = { id: productId };
      await productControllers.updateProduct(req, res);
      expect(res.status.calledWith(errorMessage.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errorMessage.response)).to.be.equal(true);
    });
  });

  describe("Testa a função updateProduct em caso de falha, quando o campo 'name' é inválido.", () => {
    it("Testa se chamando a função updateProduct recebe um objeto com chave 'message'.", async () => {
      const errorMessage = {
        response: { message: '"name" length must be at least 5 characters long' },
        code: { code: 422 }
      };
      const productId = 1;
      const productName = "Max";
      sinon.stub(productsServices, "updateProduct").resolves(errorMessage);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: productName };
      req.params = { id: productId };
      await productControllers.updateProduct(req, res);
      expect(res.status.calledWith(errorMessage.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errorMessage.response)).to.be.equal(true);
    });
  });

  describe("Testa a função updateProduct em caso de falha, quando o 'id' é inválido.", () => {
    it("Testa se chamando a função updateProduct recebe um objeto com chave 'message'.", async () => {
      const errorMessage = {
        response: { message: 'Product not found' },
        code: { code: 404 }
      };
      const productId = 999;
      const productName = "Machado de Thor Stormbreaker";
      sinon.stub(productsServices, "updateProduct").resolves(errorMessage);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = { name: productName };
      req.params = { id: productId };
      await productControllers.updateProduct(req, res);
      expect(res.status.calledWith(errorMessage.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errorMessage.response)).to.be.equal(true);
    });
  });

  describe("Testa a função deleteProduct em caso de sucesso.", () => {
    it("Testa se chamando a função deleteProduct recebe o código 204.", async () => {
      const productToBeDeleted = { id: 1, name: "Machado de Thor Stormbreaker" };
      const responseOK = { response: '', code: { code: 204 } };
      sinon.stub(productsServices, "deleteProduct").resolves({ id } = productToBeDeleted);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: productToBeDeleted.id }; 
      await productControllers.deleteProduct(req, res);
    });
  });
});