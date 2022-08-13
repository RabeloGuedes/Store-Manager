const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const salesServices = require('../../../services/sales');
const salesControllers = require('../../../controllers/sales');

describe('Testa a camada de controllers de sales.', () => {
  const fakeItemsSold = [
    {
      productId: 2,
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 5,
    },
    {
      productId: 3,
      quantity: 1,
    },
  ];

  const fakeSoldWithoutProductId = [
    {
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 5,
    },
  ];

  const fakeSoldWithInvalidProductId = [
    {
      productId: 999,
      quantity: 3,
    },
    {
      productId: 1,
      quantity: 5,
    },
  ];

  const fakeSoldWithNegativeQuantity = [
    {
      productId: 2,
      quantity: -1,
    },
    {
      productId: 1,
      quantity: 5,
    },
  ];

  const fakeSoldWithZeroQuantity = [
    {
      productId: 2,
      quantity: 2,
    },
    {
      productId: 1,
      quantity: 0,
    },
  ];

  const fakeSoldWithoutQuantity = [
    {
      productId: 2,
      quantity: 2,
    },
    {
      productId: 1,
    },
  ];
  const errors = {
    noProductId: { response: { message: '"productId" is required' }, code: { code: 400 } },
    noQuantity: { response: { message: '"quantity" is required' }, code: { code: 400 } },
    invalidQuantity: {
      response:
        { message: '"quantity" must be greater than or equal to 1' },
      code: { code: 422 },
    },
    invalidProductId: { response: { message: 'Product not found' }, code: { code: 404 } },
  };

  const responseOK = {
    response: { 
      id: 3,
      itemsSold: fakeItemsSold,
    },
    code: { code: 201 },
  };
  const req = {};
  const res = {};

  const expectedFakeResponse = 3;

  beforeEach(sinon.restore);

  describe('Testa a função createSale em caso de sucesso', () => {

    it("Testa se chamando a função createSale recebe o objeto com as chaves 'id' e 'itemsSold'.", async () => {
      sinon.stub(salesServices, 'createSale').resolves(responseOK);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeItemsSold;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(responseOK.code.code)).to.be.equal(true);
      expect(res.json.calledWith(responseOK.response)).to.be.equal(true);
    });
  });

  describe('Testa a função createSale em caso de falha, sem a chave "productId".', () => {

    it(`Testa se chamando a função createSale recebe a mensagem: ${errors.noProductId.response.message}.`, async () => {
      sinon.stub(salesServices, 'createSale').resolves(errors.noProductId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeSoldWithoutProductId;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(errors.noProductId.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errors.noProductId.response)).to.be.equal(true);
    });
  });

  describe('Testa a função createSale em caso de falha, chave "productId" inválida.', () => {

    it(`Testa se chamando a função createSale recebe a mensagem: ${errors.invalidProductId.response.message}.`, async () => {
      sinon.stub(salesServices, 'createSale').resolves(errors.invalidProductId);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeSoldWithInvalidProductId;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(errors.invalidProductId.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errors.invalidProductId.response)).to.be.equal(true);
    });
  });

  describe('Testa a função createSale em caso de falha, sem a chave "quantity".', () => {

    it(`Testa se chamando a função createSale recebe a mensagem: ${errors.noQuantity.response.message}.`, async () => {
      sinon.stub(salesServices, 'createSale').resolves(errors.noQuantity);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeSoldWithoutQuantity;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(errors.noQuantity.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errors.noQuantity.response)).to.be.equal(true);
    });
  });

  describe('Testa a função createSale em caso de falha, chave "quantity" igual a zero.', () => {

    it(`Testa se chamando a função createSale recebe a mensagem: ${errors.invalidQuantity.response.message}.`, async () => {
      sinon.stub(salesServices, 'createSale').resolves(errors.invalidQuantity);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeSoldWithZeroQuantity;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(errors.invalidQuantity.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errors.invalidQuantity.response)).to.be.equal(true);
    });
  });

  describe('Testa a função createSale em caso de falha, chave "quantity" negativa.', () => {

    it(`Testa se chamando a função createSale recebe a mensagem: ${errors.invalidQuantity.response.message}.`, async () => {
      sinon.stub(salesServices, 'createSale').resolves(errors.invalidQuantity);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeSoldWithNegativeQuantity;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(errors.invalidQuantity.code.code)).to.be.equal(true);
      expect(res.json.calledWith(errors.invalidQuantity.response)).to.be.equal(true);
    });
  });
});
