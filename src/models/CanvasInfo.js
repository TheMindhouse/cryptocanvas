// @flow
import { CanvasState } from './CanvasState'

export class CanvasInfo {
  id: number
  name: string
  paintedPixels: number
  canvasState: CanvasState
  initialBiddingFinishTime: number
  owner: string

  constructor (props: Array<any>) {
    this.id = parseInt(props[0], 10)
    this.name = props[1]
    this.paintedPixels = parseInt(props[2], 10) || 0
    this.canvasState = new CanvasState(this.id, parseInt(props[3], 10))
    this.initialBiddingFinishTime = props[4]
    this.owner = props[5]
  }
}