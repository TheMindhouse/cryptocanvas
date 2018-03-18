export class CanvasInfoModel {
  constructor (props) {
    this._id = parseInt(props[0], 10)
    this._paintedPixels = parseInt(props[1], 10)
    this._isFinished = props[2]
    this._canvasState = parseInt(props[3], 10)
    this._owner = props[4]
    this._props = props
  }

  get props () {
    return this._props
  }

  get id () {
    return this._id
  }

  get paintedPixels () {
    return this._paintedPixels
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