export class PainterReward {
  constructor (props) {
    this._paintedPixels = parseInt(props[0])
    this._rewardValue = parseFloat(props[1])
    this._isWithdrawn = props[2]
  }

  get paintedPixels () {
    return this._paintedPixels
  }

  get rewardValue () {
    return this._rewardValue
  }

  get isWithdrawn () {
    return this._isWithdrawn
  }
}