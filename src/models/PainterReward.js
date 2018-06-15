export class PainterReward {
  constructor (props) {
    this._rewardValue = parseFloat(props[0])
    this._paintedPixels = parseInt(props[1], 10)
  }

  get paintedPixels () {
    return this._paintedPixels
  }

  get rewardValue () {
    return this._rewardValue
  }

  get isWithdrawn () {
    return this.paintedPixels > 0 && this.rewardValue === 0
  }
}