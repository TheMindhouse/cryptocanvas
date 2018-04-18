import { CanvasState } from './CanvasState'

export class CanvasInfo {
  constructor (props) {
    this._id = parseInt(props[0], 10)
    this._paintedPixels = parseInt(props[1], 10)
    this._canvasState = new CanvasState(this.id, parseInt(props[2], 10))
    this._initialBiddingFinishTime = props[3]
    this._owner = props[4]
  }

  get id () {
    return this._id
  }

  get paintedPixels () {
    return this._paintedPixels ? this._paintedPixels : 0
  }

  get initialBiddingFinishTime () {
    return this._initialBiddingFinishTime
  }

  get canvasState () {
    return this._canvasState
  }

  get owner () {
    return this._owner
  }
}