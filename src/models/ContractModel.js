import { CanvasInfo } from './CanvasInfo'
import { Bid } from './Bid'
import { Transaction, TRANSACTION_TYPE } from './Transaction'
import { TransactionWithPixel } from './TransactionWithPixel'
import { CanvasSellOffer } from './CanvasSellOffer'
import { CanvasBuyOffer } from './CanvasBuyOffer'
import { PainterReward } from './PainterReward'
import { BLOCKCHAIN_CANVAS_STATES, CanvasState } from './CanvasState'
import { TransactionWithCanvasId } from './transactions/TransactionWithCanvasId'
import { cutAddress } from '../helpers/strings'

const GAS_LIMIT = 150000
const GAS_PRICE = 2000000000

export class ContractModel {
  constructor (Contract, account) {
    this._Contract = Contract
    this._account = account
    this._config = {
      gas: GAS_LIMIT,
      gasPrice: GAS_PRICE,
      from: account,
    }
    console.log('New ContractModel with account ', account)
  }

  get Contract () {
    return this._Contract
  }

  get account () {
    return this._account
  }

  get config () {
    return this._config
  }

  setPixel ({ canvasId, pixelIndex, colorId }) {
    return new Promise((resolve, reject) => {
      this.Contract.setPixel(canvasId, pixelIndex.id, colorId, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Set pixel failed')
          reject(error)
        } else {
          const tx: TransactionWithPixel = {
            hash: txHash,
            type: TRANSACTION_TYPE.setPixel,
            name: `Set pixel (x: ${pixelIndex.x}, y: ${pixelIndex.y}) to color #${colorId} on Canvas #${canvasId}`,
            canvasId: canvasId,
            colorId: colorId,
            pixelIndex: pixelIndex,
            account: this.account,
            timestamp: new Date(),
          }
          resolve(new TransactionWithPixel(tx))
        }
      })
    })
  }

  makeBid ({ canvasId, bidAmountInWei }) {
    return new Promise((resolve, reject) => {
      this.Contract.makeBid(canvasId, { ...this.config, value: bidAmountInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Make bid failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.makeBid,
            name: `Bid on Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  createCanvas () {
    return new Promise((resolve, reject) => {
      this.Contract.createCanvas({}, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Create canvas failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.createCanvas,
            name: 'Create Canvas',
            account: this.account,
            timestamp: new Date(),
          }
          resolve(new Transaction(tx))
        }
      })
    })
  }

  makeBuyOffer (canvasId, valueInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.makeBuyOffer(canvasId, { ...this.config, value: valueInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Make buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.buyOffer,
            name: `Buy Offer on Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  cancelBuyOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.cancelBuyOffer(canvasId, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Cancel buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.cancelBuyOffer,
            name: `Cancel Offer on Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })

  }

  acceptBuyOffer (canvasId, priceInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.acceptBuyOffer(canvasId, priceInWei, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Accept buy offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.acceptBuyOffer,
            name: `Accept Buy Offer on Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  offerForSale (canvasId, price) {
    return new Promise((resolve, reject) => {
      this.Contract.offerCanvasForSale(canvasId, price, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Offer for sale failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.offerForSale,
            name: `Offer Canvas #${canvasId} for sale`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  offerForSaleToAddress (canvasId, price, receiverAddress) {
    return new Promise((resolve, reject) => {
      this.Contract.offerCanvasForSaleToAddress(canvasId, price, receiverAddress, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Offer for sale to address failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.offerForSaleToAddress,
            name: `Offer Canvas #${canvasId} for sale to address ${cutAddress(receiverAddress)}...`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  cancelSellOffer (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.cancelSellOffer(canvasId, this.config, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Cancel sell offer failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.cancelSellOffer,
            name: `Cancel Sell Offer for Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  acceptSellOffer (canvasId, priceInWei) {
    return new Promise((resolve, reject) => {
      this.Contract.acceptSellOffer(canvasId, { ...this.config, value: priceInWei }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Buy Canvas failed')
          reject(error)
        } else {
          const tx = {
            hash: txHash,
            type: TRANSACTION_TYPE.acceptSellOffer,
            name: `Buy Canvas #${canvasId}`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  addRewardToAccountBalance (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.addRewardToPendingWithdrawals(canvasId, { ...this.config }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Add Reward to Account Balance failed')
          reject(error)
        } else {
          const tx: TransactionWithCanvasId = {
            hash: txHash,
            type: TRANSACTION_TYPE.addRewardToBalance,
            name: `Add Reward for Canvas #${canvasId} to Account Balance`,
            account: this.account,
            timestamp: new Date(),
            canvasId,
          }
          resolve(new TransactionWithCanvasId(tx))
        }
      })
    })
  }

  withdrawBalance () {
    return new Promise((resolve, reject) => {
      this.Contract.withdraw({ ...this.config }, (error, txHash) => {
        if (error) {
          console.log(error)
          console.log('[ERROR] Withdraw Account Balance failed')
          reject(error)
        } else {
          const tx: Transaction = {
            hash: txHash,
            type: TRANSACTION_TYPE.withdrawBalance,
            name: `Withdraw Account Balance`,
            account: this.account,
            timestamp: new Date(),
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
    const state = Object.entries(BLOCKCHAIN_CANVAS_STATES).findIndex(state => state[ 1 ] === canvasState)
    if (state < 0) {
      return Promise.reject('Incorrect state')
    }
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasByState(state, this.config, (error, result) => {
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
      this.Contract.getCanvasCount(this.config, (error, result) => {
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
      this.Contract.getLastBidForCanvas(canvasId, this.config, (error, result) => {
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
      this.Contract.getCanvasBitmap(canvasId, {}, (error, result) => {
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
      // Different gas limit is a solution to Metamask caching results...
      this.Contract.getCanvasInfo(canvasId, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(new CanvasInfo(result))
        }
      })
    })
  }

  getCanvasPainters (canvasId) {
    return new Promise((resolve, reject) => {
      // Different gas limit is a solution to Metamask caching results...
      this.Contract.getCanvasPainters(canvasId, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    })

  }

  getCanvasState (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasState(canvasId, {}, (error, result) => {
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
      this.Contract.getCurrentBuyOffer(canvasId, {}, (error, result) => {
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
      this.Contract.getCurrentSellOffer(canvasId, {}, (error, result) => {
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
      this.Contract.calculateReward(canvasId, userAddress, {}, (error, result) => {
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
      this.Contract.getPixelAuthor(canvasId, pixelIndex, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  getOwnedCanvasCount (userAddress = '') {
    return new Promise((resolve, reject) => {
      this.Contract.balanceOf(userAddress, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
        }
      })
    })
  }

  getPaintedPixelsCountByAddress (userAddress = '', canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getPaintedPixelsCountByAddress(userAddress, canvasId, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
        }
      })
    })
  }

  getAccountBalance (userAddress = '') {
    // Different gas limit is a solution to Metamask caching results...
    return new Promise((resolve, reject) => {
      this.Contract.getPendingWithdrawal(userAddress, {}, (error, result) => {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          resolve(parseInt(result, 10))
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
    return this.Contract.SellOfferCancelled(...args)
  }

  CanvasSoldEvent (...args) {
    return this.Contract.CanvasSold(...args)
  }
}