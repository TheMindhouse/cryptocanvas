const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export class CanvasSellOffer {
  constructor (props) {
    this._isForSale = props[0]
    this._seller = props[1]
    this._price = parseFloat(props[2])
    this._onlySellTo = (props[3] === NULL_ADDRESS) ? undefined : props[3]
  }

  get isForSale () {
    return this._isForSale
  }

  get seller () {
    return this._seller
  }

  get price () {
    return this._price
  }

  get onlySellTo () {
    return this._onlySellTo
  }
}