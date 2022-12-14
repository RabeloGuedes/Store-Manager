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
    noProductId: { response: { message: '"productId" is required' }, code: 400 },
    noQuantity: { response: { message: '"quantity" is required' }, code: 400 },
    invalidQuantity: {
      response:
        { message: '"quantity" must be greater than or equal to 1' },
      code: 422,
    },
    invalidProductId: { response: { message: 'Product not found' }, code: 404 },
  };

  const responseOK = {
    response: { 
      id: 3,
      itemsSold: fakeItemsSold,
    },
    code: 201,
  };

  const allSalesResponse = [
    {
      response: [
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
      ],
      code: 200 ,
    }
  ];

  const firstSaleResponse = {
      response: [
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
        }
      ],
      code: 200,
  };
  const noSaleFound = { response: { message: 'Sale not found' }, code: 404 }
  const req = {};
  const res = {};

  const expectedFakeResponse = 3;

  beforeEach(sinon.restore);

  describe('Testa a fun????o createSale em caso de sucesso', () => {

    it("Testa se chamando a fun????o createSale recebe o objeto com as chaves 'id' e 'itemsSold'.", async () => {
      sinon.stub(salesServices, 'createSale').resolves(responseOK);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.body = fakeItemsSold;
      await salesControllers.createSale(req, res);
      expect(res.status.calledWith(responseOK.code)).to.be.equal(true);
      expect(res.json.calledWith(responseOK.response)).to.be.equal(true);
    });
  });

  // describe('Testa a fun????o createSale em caso de falha, sem a chave "productId".', () => {

  //   it(`Testa se chamando a fun????o createSale recebe a mensagem: ${errors.noProductId.response.message}.`, async () => {
  //     sinon.stub(salesServices, 'createSale').resolves(errors.noProductId);
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     req.body = fakeSoldWithoutProductId;
  //     await salesControllers.createSale(req, res);
  //     expect(res.status.calledWith(errors.noProductId.code)).to.be.equal(true);
  //     expect(res.json.calledWith(errors.noProductId.response)).to.be.equal(true);
  //   });
  // });

  // describe('Testa a fun????o createSale em caso de falha, chave "productId" inv??lida.', () => {

  //   it(`Testa se chamando a fun????o createSale recebe a mensagem: ${errors.invalidProductId.response.message}.`, async () => {
  //     sinon.stub(salesServices, 'createSale').resolves(errors.invalidProductId);
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     req.body = fakeSoldWithInvalidProductId;
  //     await salesControllers.createSale(req, res);
  //     expect(res.status.calledWith(errors.invalidProductId.code.code)).to.be.equal(true);
  //     expect(res.json.calledWith(errors.invalidProductId.response)).to.be.equal(true);
  //   });
  // });

  // describe('Testa a fun????o createSale em caso de falha, sem a chave "quantity".', () => {

  //   it(`Testa se chamando a fun????o createSale recebe a mensagem: ${errors.noQuantity.response.message}.`, async () => {
  //     sinon.stub(salesServices, 'createSale').resolves(errors.noQuantity);
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     req.body = fakeSoldWithoutQuantity;
  //     await salesControllers.createSale(req, res);
  //     expect(res.status.calledWith(errors.noQuantity.code.code)).to.be.equal(true);
  //     expect(res.json.calledWith(errors.noQuantity.response)).to.be.equal(true);
  //   });
  // });

  // describe('Testa a fun????o createSale em caso de falha, chave "quantity" igual a zero.', () => {

  //   it(`Testa se chamando a fun????o createSale recebe a mensagem: ${errors.invalidQuantity.response.message}.`, async () => {
  //     sinon.stub(salesServices, 'createSale').resolves(errors.invalidQuantity);
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     req.body = fakeSoldWithZeroQuantity;
  //     await salesControllers.createSale(req, res);
  //     expect(res.status.calledWith(errors.invalidQuantity.code.code)).to.be.equal(true);
  //     expect(res.json.calledWith(errors.invalidQuantity.response)).to.be.equal(true);
  //   });
  // });

  // describe('Testa a fun????o createSale em caso de falha, chave "quantity" negativa.', () => {

  //   it(`Testa se chamando a fun????o createSale recebe a mensagem: ${errors.invalidQuantity.response.message}.`, async () => {
  //     sinon.stub(salesServices, 'createSale').resolves(errors.invalidQuantity);
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     req.body = fakeSoldWithNegativeQuantity;
  //     await salesControllers.createSale(req, res);
  //     expect(res.status.calledWith(errors.invalidQuantity.code.code)).to.be.equal(true);
  //     expect(res.json.calledWith(errors.invalidQuantity.response)).to.be.equal(true);
  //   });
  // });

  describe('Testa a fun????o getAllSales.', () => {

    it('Testa se chamando a fun????o getAllSales recebe um array com todas as vendas.', async () => {
      sinon.stub(salesServices, 'getAllSales').resolves(allSalesResponse[0].response);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await salesControllers.getAllSales(req, res);
      expect(res.status.calledWith(allSalesResponse[0].code)).to.be.equal(true);
      expect(res.json.calledWith(allSalesResponse[0].response)).to.be.equal(true);
    });
  });

  describe('Testa a fun????o getSaleById em caso de sucesso.', () => {

    it('Testa se chamando a fun????o getSaleById recebe um objeto com os id dos produtos comprados e suas quantidades.', async () => {
      sinon.stub(salesServices, 'getSaleById').resolves(firstSaleResponse);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = {};
      req.params.id = 1;
      await salesControllers.getSaleById(req, res);
      expect(res.status.calledWith(firstSaleResponse.code)).to.be.equal(true);
      expect(res.json.calledWith(firstSaleResponse.response)).to.be.equal(true);
    });
  });

  describe('Testa a fun????o deleteSale em caso de sucesso.', () => {

    it('Testa se chamando a fun????o deleteSale recebe o c??digo 204.', async () => {
      const responseInfo = { response: '', code: 204 };
      sinon.stub(salesServices, 'deleteSale').resolves(responseInfo);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = {};
      req.params.id = 1;
      await salesControllers.deleteSale(req, res);
      expect(res.status.calledWith(responseInfo.code)).to.be.equal(true);
    });
  });

  describe('Testa a fun????o updataSale em caso de sucesso.', () => {

    it('Testa se chamando a fun????o updateSale recebe o c??digo 200.', async () => {
      const responseInfo = { response: { saleId: 1, itemsUpdated: [{ productId : 1, quantity: 2 }] }, code: 200 };
      sinon.stub(salesServices, 'updateSale').resolves(responseInfo);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = {};
      req.params.id = 1;
      await salesControllers.updateSale(req, res);
      expect(res.status.calledWith(responseInfo.code)).to.be.equal(true);
    });
  });

});
