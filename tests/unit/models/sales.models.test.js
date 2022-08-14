const { describe } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const salesModels = require('../../../models/sales');
const connection = require('../../../models/connection');

describe('Testa a camada models de sales', () => {
  const fakeSales = [
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
  const fisrtRegistredSales = [
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
  const saleId = {
    insertId: 3
  };
  beforeEach(sinon.restore);
  describe('Testa a função createSale', () => {
    it('Verifica se o retorno da função createSale é um objeto que contém a chave "insertId".', async () => {
      sinon.stub(connection, 'execute').resolves([saleId]);
      const newSale = await salesModels.createSale(fakeSales);

      expect(newSale).to.be.a('number').equal(3);
    });
  });

    describe('Testa a função getAllSales', () => {
    it('Verifica se o retorno da função getAllSales é um array que contém objetos com os produtos de cada venda.', async () => {
      sinon.stub(connection, 'execute').resolves([registredSales]);
      const sales = await salesModels.getAllSales();
      
      expect(sales).to.be.an('array');
      expect(sales[0]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(sales[1]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(sales[2]).to.be.an('object').that.has.all.keys('saleId', 'date', 'productId', 'quantity');
    });
    });
  
  describe('Testa a função getSaleById', () => {
    it('Verifica se o retorno da função getSaleById é um array que contém objetos com os produtos da venda requisitada.', async () => {
      sinon.stub(connection, 'execute').resolves([fisrtRegistredSales]);
      const sale = await salesModels.getSaleById(1);
      
      expect(sale).to.be.an('array');
      expect(sale[0]).to.be.an('object').that.has.all.keys('date', 'productId', 'quantity');
      expect(sale[1]).to.be.an('object').that.has.all.keys('date', 'productId', 'quantity');
    });
  });
  
  describe('Testa a função deleteSale', () => {
    it('Verifica se a função deleteSale deleta a venda requisitada.', async () => {
      sinon.stub(connection, 'execute').resolves();
      await salesModels.deleteSale(1);
    });
  });
})