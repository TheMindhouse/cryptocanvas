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
  colorId: number,
  pixelIndex: PixelIndex,
}

export class TransactionWithPixel extends Transaction {
  constructor (props: Props) {
    super(props)
    this.canvasId = props.canvasId
    this.colorId = props.colorId
    this.pixelIndex = props.pixelIndex
  }
}