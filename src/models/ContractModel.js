import { CanvasInfo } from './CanvasInfo'
import { Bid } from './Bid'
import { Transaction, TRANSACTION_TYPE } from './Transaction'
import { CanvasSellOffer } from './CanvasSellOffer'
import { CanvasBuyOffer } from './CanvasBuyOffer'
import { PainterReward } from './PainterReward'
import { BLOCKCHAIN_CANVAS_STATES, CanvasState } from './CanvasState'

const GAS_LIMIT = 3000000
const GAS_PRICE = 2000000000

const DEFAULT_CONFIG = {
  gas: GAS_LIMIT,
  gasPrice: GAS_PRICE
}

export class ContractModel {
  constructor (Contract) {
    this._Contract = Contract
  }

  get Contract () {
    return this._Contract
  }

  setPixel ({ canvasId, index, color }) {
    return new Promise((resolve, reject) => {
      this.Contract.setPixel(canvasId, index, color, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Set pixel failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.setPixel,
            name: `Set pixel to #${color} on Canvas ${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  makeBid ({ canvasId, bidAmountInWei }) {
    return new Promise((resolve, reject) => {
      this.Contract.makeBid(canvasId, { ...DEFAULT_CONFIG, value: bidAmountInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Make bid failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.makeBid,
            name: `Bid on Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  createCanvas () {
    return new Promise((resolve, reject) => {
      this.Contract.createCanvas({}, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Create canvas failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.createCanvas,
            name: 'Create Canvas'
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  makeBuyOffer (canvasId, valueInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.enterBuyOffer(canvasId, { ...DEFAULT_CONFIG, value: valueInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Make buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.buyOffer,
            name: `Buy Offer on Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  cancelBuyOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.cancelBuyOffer(canvasId, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Cancel buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.cancelBuyOffer,
            name: `Cancel Offer on Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })

  }

  acceptBuyOffer (canvasId, priceInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.acceptBuyOffer(canvasId, priceInWei, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Accept buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.acceptBuyOffer,
            name: `Accept Buy Offer on Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  offerForSale (canvasId, price) {
    return new Promise((resolve, reject) => {
      this.Contract.offerCanvasForSale(canvasId, price, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Offer for sale failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.offerForSale,
            name: `Offer Canvas #${canvasId} for sale`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  offerForSaleToAddress (canvasId, price, receiverAddress) {
    return new Promise((resolve, reject) => {
      this.Contract.offerCanvasForSaleToAddress(canvasId, price, receiverAddress, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Offer for sale to address failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.offerForSaleToAddress,
            name: `Offer Canvas #${canvasId} for sale to address ${receiverAddress}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  cancelSellOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.canvasNoLongerForSale(canvasId, DEFAULT_CONFIG, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Cancel sell offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.cancelSellOffer,
            name: `Cancel Sell Offer for Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  acceptSellOffer (canvasId, priceInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.buyCanvas(canvasId, { ...DEFAULT_CONFIG, value: priceInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Buy Canvas failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.acceptSellOffer,
            name: `Buy Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  withdrawReward (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.withdrawReward(canvasId, { ...DEFAULT_CONFIG }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Withdraw reward failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.withdrawReward,
            name: `Withdraw Reward for Canvas #${canvasId}`
          }
          resolve(new Transaction(tx))
        }
      })
    })

  }

  /**
   * View functions (free)
   */

  getCanvasIdsByState (canvasState) {
    const state = Object.entries(BLOCKCHAIN_CANVAS_STATES).findIndex(state => state[1] === canvasState)
    if (state < 0) {
      return Promise.reject('Incorrect state')
    }
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasByState(state, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result.map(canvasId => parseInt(canvasId, 10)))
        }
      })
    })
  }

  getCanvasCount () {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasCount(DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
        }
      })
    })
  }

  getLastBid (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getLastBidForCanvas(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new Bid(result))
        }
      })
    })
  }

  getCanvas (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getBitmap(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result.map(pixel => parseInt(pixel, 10)))
        }
      })
    })
  }

  getCanvasInfo (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasInfo(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new CanvasInfo(result))
        }
      })
    })
  }

  getCanvasState (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasState(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new CanvasState(canvasId, parseInt(result, 10)))
        }
      })
    })
  }

  getCurrentBuyOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCurrentBuyOffer(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new CanvasBuyOffer(result))
        }
      })
    })
  }

  getCurrentSellOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCurrentSellOffer(canvasId, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new CanvasSellOffer(result))
        }
      })
    })
  }

  getRewardInfo (canvasId, userAddress = '') {
    return new Promise((resolve, reject) => {
      this.Contract.calculateReward(canvasId, userAddress, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new PainterReward(result))
        }
      })
    })
  }

  getPixelAuthor (canvasId, pixelIndex) {
    return new Promise((resolve, reject) => {
      this.Contract.getPixelAuthor(canvasId, pixelIndex, DEFAULT_CONFIG, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    })

  }

  /**
   * Subscription to events
   */

  PixelPaintedEvent (...args) {
    return this.Contract.PixelPainted(...args)
  }

  BidPostedEvent (...args) {
    return this.Contract.BidPosted(...args)
  }

  CanvasCreatedEvent (...args) {
    return this.Contract.CanvasCreated(...args)
  }

  BuyOfferMadeEvent (...args) {
    return this.Contract.BuyOfferMade(...args)
  }

  BuyOfferCancelledEvent (...args) {
    return this.Contract.BuyOfferCancelled(...args)
  }

  SellOfferMadeEvent (...args) {
    return this.Contract.CanvasOfferedForSale(...args)
  }

  SellOfferCancelledEvent (...args) {
    return this.Contract.CanvasNoLongerForSale(...args)
  }

  CanvasSoldEvent (...args) {
    return this.Contract.CanvasSold(...args)
  }
}