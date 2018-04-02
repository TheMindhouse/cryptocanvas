export class CanvasBuyOffer {
  constructor (props) {
    this._hasOffer = props[0]
    this._buyer = props[1]
    this._price = parseFloat(props[2]) // todo: change contract field from amount to price
  }

  get hasOffer () {
    return this._hasOffer
  }

  get buyer () {
    return this._buyer
  }

  get price () {
    return this._price
  }
}