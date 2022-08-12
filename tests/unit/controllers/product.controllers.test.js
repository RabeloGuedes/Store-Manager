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
});