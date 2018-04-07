export class CanvasInfo {
  constructor (props) {
    this._id = parseInt(props[0], 10)
    this._paintedPixels = parseInt(props[1], 10)
    this._isFinished = props[2]
    this._canvasState = parseInt(props[3], 10)
    this._owner = props[4]
  }

  get id () {
    return this._id
  }

  get paintedPixels () {
    return this._paintedPixels ? this._paintedPixels : 0
  }

  get isFinished () {
    return this._isFinished
  }

  get canvasState () {
    return this._canvasState
  }

  get owner () {
    return this._owner
  }
}