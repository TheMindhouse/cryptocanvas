import { CanvasState } from './CanvasState'

export class CanvasInfo {
  constructor (props) {
    this._id = parseInt(props[0], 10)
    this._name = props[1]
    this._paintedPixels = parseInt(props[2], 10)
    this._canvasState = new CanvasState(this.id, parseInt(props[3], 10))
    this._initialBiddingFinishTime = props[4]
    this._owner = props[5]
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
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