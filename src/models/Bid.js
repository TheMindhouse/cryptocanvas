export class Bid {
  constructor (props) {
    this._bidder = props._bidder
    this._amount = props._amount ? parseFloat(props._amount) : null
    this._finishTime = props._finishTime
  }

  get bidder () {
    return this._bidder
  }

  get amount () {
    return this._amount
  }

  get finishTime () {
    return this._finishTime
  }
}