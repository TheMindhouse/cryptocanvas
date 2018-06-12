// @flow
import type { PixelIndex } from '../types/PixelIndex'

type Props = {
  canvasId: number,
  pixelIndex: PixelIndex,
  colorId: number,
}

export class SelectedPixel {
  canvasId: number
  pixelIndex: PixelIndex
  colorId: number

  constructor (props: Props) {
    this.canvasId = props.canvasId
    this.pixelIndex = props.pixelIndex
    this.colorId = props.colorId
  }

}