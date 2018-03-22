import { CanvasInfo } from './CanvasInfo'

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

  /**
   * Events
   */

  PixelPainted (...args) {
    return this.Contract.PixelPainted(args)
  }
}