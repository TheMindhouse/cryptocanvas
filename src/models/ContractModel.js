import { CanvasInfo } from './CanvasInfo'

export class ContractModel {
  constructor (_Contract) {
    this.Contract = _Contract
    this.gasLimit = 3000000
  }

  getCanvasInfo (_canvasId) {
    return new Promise((resolve, reject) => {
      this.Contract.getCanvasInfo(_canvasId, { gas: this.gasLimit }, (error, result) => {
        if (error) {
          console.error(error)
          reject(error)
          return
        }
        resolve(new CanvasInfo(result))
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