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
})