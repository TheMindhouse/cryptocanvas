export class PixelPainted {
  constructor (props) {
    this._artworkId = parseInt(props._artworkId, 10)
    this._color = parseInt(props._color, 10)
    this._index = parseInt(props._index, 10)
  }

  get artworkId () {
    return this._artworkId
  }

  get color () {
    return this._color
  }

  get index () {
    return this._index
  }
}