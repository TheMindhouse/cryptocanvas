export const TRANSACTION_STATUS = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed'
}

export const TRANSACTION_RECEIPT_STATUS = {
  0: TRANSACTION_STATUS.failed,
  1: TRANSACTION_STATUS.completed,
}

export const TRANSACTION_TYPE = {
  createCanvas: 'createCanvas',
  setPixel: 'setPixel',
  setPixels: 'setPixels',
  makeBid: 'makeBid',
  buyOffer: 'buyOffer',
  cancelBuyOffer: 'cancelBuyOffer',
  acceptBuyOffer: 'acceptBuyOffer',
  offerForSale: 'offerForSale',
  offerForSaleToAddress: 'offerForSaleToAddress',
  cancelSellOffer: 'cancelSellOffer',
  acceptSellOffer: 'acceptSellOffer',
  addRewardToBalance: 'addRewardToBalance',
  withdrawBalance: 'withdrawBalance',
}

export class Transaction {
  constructor ({ hash, type, name, status, account, timestamp }) {
    if (TRANSACTION_TYPE[type] === 'undefined') {
      throw new Error('Incorrect transaction type')
    }

    this.hash = hash
    this.status = status || TRANSACTION_STATUS.pending
    this.type = TRANSACTION_TYPE[type]
    this.name = name
    this.account = account
    this.timestamp = new Date(timestamp)
  }
}