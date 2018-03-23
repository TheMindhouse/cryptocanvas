export class Bid {
  constructor (props) {
    this._bidder = props._bidder
    this._amount = props._amount ? parseFloat(props._amount) : undefined
    this._finishTime = props._finishTime ? parseFloat(props._finishTime) : undefined
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