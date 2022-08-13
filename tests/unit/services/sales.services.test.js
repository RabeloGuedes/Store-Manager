const sinon = require('sinon');
const { describe } = require('mocha');
const { expect } = require('chai');
const salesModels = require('../../../models/sales');
const salesServices = require('../../../services/sales');

describe('Testa a camada de service de sales.', () => {
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

  const expectedFakeResponse = 3;

  beforeEach(sinon.restore);

  describe('Testa a função createSale', () => {

    it("Testa se chamando a função createSale recebe o objeto com as chaves 'response' contendo as chaves 'id' e 'itemsSold', além de outra chave 'code' contendo uma chave interna 'code'.", async () => {
      sinon.stub(salesModels, 'createSale').resolves(expectedFakeResponse);
      const salesInfos = await salesServices.createSale(fakeItemsSold);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.id).to.be.equal(expectedFakeResponse);
      expect(salesInfos.response.itemsSold).to.be.equal(fakeItemsSold);
      expect(salesInfos.code.code).to.be.equal(201);
    });

    it("Testa se chamando a função createSale sem o 'productId' recebe a mensagem de erro correta.", async () => {
      const salesInfos = await salesServices.createSale(fakeSoldWithoutProductId);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.message).to.be.equal(errors.noProductId.response.message);
      expect(salesInfos.code.code).to.be.equal(errors.noProductId.code.code);
    });

    it("Testa se chamando a função createSale com o 'productId' inválido recebe a mensagem de erro correta.", async () => {
      const salesInfos = await salesServices.createSale(fakeSoldWithInvalidProductId);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.message).to.be.equal(errors.invalidProductId.response.message);
      expect(salesInfos.code.code).to.be.equal(errors.invalidProductId.code.code);
    });

    it("Testa se chamando a função createSale com o 'quantity' menor que zero recebe a mensagem de erro correta.", async () => {
      const salesInfos = await salesServices.createSale(fakeSoldWithNegativeQuantity);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.message).to.be.equal(errors.invalidQuantity.response.message);
      expect(salesInfos.code.code).to.be.equal(errors.invalidQuantity.code.code);
    });
    it("Testa se chamando a função createSale com o 'quantity' igual a zero recebe a mensagem de erro correta.", async () => {
      const salesInfos = await salesServices.createSale(fakeSoldWithZeroQuantity);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.message).to.be.equal(errors.invalidQuantity.response.message);
      expect(salesInfos.code.code).to.be.equal(errors.invalidQuantity.code.code);
    });
    it("Testa se chamando a função createSale sem o 'quantity' recebe a mensagem de erro correta.", async () => {
      const salesInfos = await salesServices.createSale(fakeSoldWithoutQuantity);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.message).to.be.equal(errors.noQuantity.response.message);
      expect(salesInfos.code.code).to.be.equal(errors.noQuantity.code.code);
    });
  });
});
