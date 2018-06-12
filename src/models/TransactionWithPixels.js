// @flow
import { Transaction } from './Transaction'
import type { PixelIndex } from '../types/PixelIndex'

type Props = {
  // Transaction props
  hash: string,
  type: string,
  name: string,
  status: string,
  // TransactionWithPixel props
  canvasId: number,
  colorIds: Array<number>,
  pixelIndexes: Array<PixelIndex>,
}

export class TransactionWithPixels extends Transaction {
  constructor (props: Props) {
    super(props)
    this.canvasId = props.canvasId
    this.colorIds = props.colorIds
    this.pixelIndexes = props.pixelIndexes
  }
}