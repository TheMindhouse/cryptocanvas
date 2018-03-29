export class Bid {
  constructor (props) {
    if (props._bidder) {
      // Bid from event
      this._bidder = props._bidder
      this._amount = props._amount ? parseFloat(props._amount) : undefined
      this._finishTime = props._finishTime ? parseFloat(props._finishTime) : undefined
    } else {
      // Bid from Contract function
      this._bidder = props[0]
      this._amount = parseFloat(props[1])
      this._finishTime = parseFloat(props[2])
    }
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