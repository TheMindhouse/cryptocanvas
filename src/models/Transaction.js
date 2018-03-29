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
  makeBid: 'makeBid',
  buyOffer: 'buyOffer',
  cancelBuyOffer: 'cancelBuyOffer',
  sellOffer: 'sellOffer',
  withdrawReward: 'withdrawReward',
}

export class Transaction {
  constructor ({ hash, type, name, status }) {
    if (TRANSACTION_TYPE[type] === 'undefined') {
      throw new Error('Incorrect transaction type')
    }

    this.hash = hash
    this.status = status || TRANSACTION_STATUS.pending
    this.type = TRANSACTION_TYPE[type]
    this.name = name
  }
}