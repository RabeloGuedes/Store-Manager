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
  const newProduct = { id: 4, name: "Armadura do homem de ferro" };
  const updatedProduct = { name: "Machado de Thor Stormbreaker" };
  const response = (res, codeValue) => ({
    response: res,
    code: codeValue,
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

  describe("Testa a função updateProduct em caso de sucesso.", () => {
    it("Testa se chamando a função updateProduct recebe um objeto com chaves 'id' e 'name'.", async () => {
      sinon.stub(productsServices, "updateProduct").resolves(response(updatedProduct, 200));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = updatedProduct;
      req.params = { id: 1 };
      await productControllers.updateProduct(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(updatedProduct)).to.be.equal(true);
    });
  });

  describe("Testa a função deleteProduct em caso de sucesso.", () => {
    it("Testa se chamando a função deleteProduct recebe o código 204.", async () => {
      sinon.stub(productsServices, "deleteProduct").resolves(response('', 204));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: fakeProducts[0].id }; 
      await productControllers.deleteProduct(req, res);
      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith('')).to.be.equal(true);
    });
  });

  describe("Testa a função getProductBySearch em caso de sucesso.", () => {
    it("Testa se chamando a função getProductBySearch recebe o código 200.", async () => {
      sinon.stub(productsServices, "getProductBySearch").resolves(response(fakeProducts[0].name, 200));
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: fakeProducts[0].id }; 
      await productControllers.getProductBySearch(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});