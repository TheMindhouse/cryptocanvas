import { CanvasInfo } from './CanvasInfo'
import { Bid } from './Bid'
import { Transaction, TRANSACTION_TYPE } from './Transaction'

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

  /**
   * View functions (free)
   */

  getActiveCanvasIds () {
    return new Promise((resolve, reject) => {
      this.Contract.getActiveCanvases(DEFAULT_CONFIG, (error, result) => {
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
      this.Contract.getArtworksCount(DEFAULT_CONFIG, (error, result) => {
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
      this.Contract.getArtwork(canvasId, DEFAULT_CONFIG, (error, result) => {
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

  /**
   * Subscription to events
   */

  PixelPaintedEvent (...args) {
    return this.Contract.PixelPainted(args)
  }

  BidPostedEvent (...args) {
    return this.Contract.BidPosted(args)
  }

  CanvasCreatedEvent (...args) {
    return this.Contract.CanvasCreated(args)
  }
}