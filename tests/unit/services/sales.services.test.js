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
  noSale: { response: { message: 'Sale not found' }, code: { code: 404 } },
};
  const registredSales = [
    {
      saleId: 1,
      date: "2022-08-13T17:33:12.000Z",
      productId: 1,
      quantity: 5
    },
    {
      saleId: 1,
      date: "2022-08-13T17:33:12.000Z",
      productId: 2,
      quantity: 10
    },
    {
      saleId: 2,
      date: "2022-08-13T17:33:12.000Z",
      productId: 3,
      quantity: 15
    }
  ];
  const firstRegistredSale = [
    {
      date: "2022-08-13T17:33:12.000Z",
      productId: 1,
      quantity: 5
    },
    {
      date: "2022-08-13T17:33:12.000Z",
      productId: 2,
      quantity: 10
    },
  ];

  const expectedFakeResponse = 3;

  beforeEach(sinon.restore);

  describe('Testa a função createSale', () => {

    it("Testa se chamando a função createSale recebe o objeto com as chaves 'response' contendo as chaves 'id' e 'itemsSold', além de outra chave 'code' contendo uma chave interna 'code'.", async () => {
      sinon.stub(salesModels, 'createSale').resolves(expectedFakeResponse);
      const salesInfos = await salesServices.createSale(fakeItemsSold);

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response.id).to.be.equal(expectedFakeResponse);
      expect(salesInfos.response.itemsSold).to.be.equal(fakeItemsSold);
      expect(salesInfos.code).to.be.equal(201);
    });
  });

  describe('Testa a função getAllSales', () => {

    it("Verifica se o retorno da função getAllSales é um array que contém objetos com os produtos de cada venda.", async () => {
      sinon.stub(salesModels, 'getAllSales').resolves(registredSales);
      const salesInfos = await salesServices.getAllSales();

      expect(salesInfos).to.be.an('array');
      expect(salesInfos[0]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(salesInfos[1]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(salesInfos[2]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('Testa a função getSaleById', () => {

    it("Verifica se o retorno da função getSaleById, em caso de sucesso, é um objeto que contém objetos com os produtos da venda requisitada.", async () => {
      sinon.stub(salesModels, 'getSaleById').resolves(firstRegistredSale);
      const salesInfos = await salesServices.getSaleById({ params: { id: 1 } });

      expect(salesInfos).to.be.an('object').that.has.all.keys('response', 'code');
      expect(salesInfos.response[0]).to.be.an('object').that.has.all.keys('date', 'productId', 'quantity');
      expect(salesInfos.response[0].date).to.be.equal(firstRegistredSale[0].date);
      expect(salesInfos.response[0].quantity).to.be.equal(firstRegistredSale[0].quantity);
      expect(salesInfos.code).to.be.a('number').that.is.equal(200);
    });
  });
  
  describe('Testa a função deleteSale', () => {

    it("Verifica se o retorno da função deleteSale, em caso de sucesso, é um objeto com o código 204.", async () => {
      const toDeleteSale = { id: 1 }
      const responseOk = { response: '', code: 204 };
      sinon.stub(salesModels, 'deleteSale').resolves();
      const responseInfo = await salesServices.deleteSale({ id } = toDeleteSale );

      expect(responseInfo).to.be.an('object').that.has.all.keys('response', 'code');
      expect(responseInfo.response).to.be.a('string').that.has.is.equal('');
      expect(responseInfo.code).to.be.a('number').that.has.is.equal(responseOk.code);
    });
  });

  describe('Testa a função updateSale', () => {

    it("Verifica se o retorno da função updateSale, em caso de sucesso, é um objeto com o código 200.", async () => {
      const params = { id: 1 }
      const body = [
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
      const req = { params, body };
      sinon.stub(salesModels, 'updateSale').resolves();
      const responseInfo = await salesServices.updateSale(req);

      expect(responseInfo).to.be.an('object').that.has.all.keys('response', 'code');
      expect(responseInfo.response).to.be.an('object').that.has.all.keys('saleId', 'itemsUpdated');
    });
  });
});
