export class PixelPainted {
  constructor (props) {
    this._canvasId = parseInt(props.canvasId, 10)
    this._color = parseInt(props.color, 10)
    this._index = parseInt(props.index, 10)
  }

  get canvasId () {
    return this._canvasId
  }

  get color () {
    return this._color
  }

  get index () {
    return this._index
  }
}