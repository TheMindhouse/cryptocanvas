export class Bid {
  constructor (props) {
    if (props.bidder) {
      // Bid from event
      this._canvasId = parseInt(props.canvasId, 10)
      this._bidder = props.bidder
      this._amount = props.amount ? parseFloat(props.amount) : undefined
      this._finishTime = props.finishTime ? parseFloat(props.finishTime) : undefined
    } else {
      // Bid from Contract function
      this._canvasId = parseInt(props[0], 10)
      this._bidder = props[1]
      this._amount = parseFloat(props[2])
      this._finishTime = parseFloat(props[3])
    }
  }

  get canvasId () {
    return this._canvasId
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