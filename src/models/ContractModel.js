import { CanvasInfo } from './CanvasInfo'
import { Bid } from './Bid'

const GAS_LIMIT = 3000000

export class ContractModel {
  constructor (_Contract) {
    this.Contract = _Contract
    this.gasLimit = GAS_LIMIT
  }

  getCanvasInfo (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasInfo(canvasId, { gas: this.gasLimit }, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(new CanvasInfo(result))
      })
    })
  }

  getCanvas (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getArtwork(canvasId, { gas: this.gasLimit }, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(result.map(pixel => parseInt(pixel)))
      })
    })
  }

  setPixel ({ canvasId, index, color }) {
    return new Promise((resolve, reject) => {
      this.Contract.setPixel(canvasId, index, color, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(result)
      })
    })
  }

  getLastBid (canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getLastBidForArtwork(canvasId, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(new Bid(result))
      })
    })
  }

  makeBid ({ canvasId, bidAmountInWei }) {
    return new Promise((resolve, reject) => {
      this.Contract.makeBid(canvasId, { value: bidAmountInWei, gas: this.gasLimit }, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(result)
      })
    })
  }

  getActiveCanvasIds () {
    return new Promise((resolve, reject) => {
      this.Contract.getActiveCanvases((error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(result.map(canvasId => parseInt(canvasId, 10)))
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
}