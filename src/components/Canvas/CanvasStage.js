// @flow
import React from 'react'
import './styles/CanvasStage.css'
import { CanvasPixelPopup } from './CanvasPixelPopup'
import { PixelHoverHighlight } from './PixelHoverHighlight'
import { PixelHoverColorPopup } from './PixelHoverColorPopup'
import { KonvaStage } from './KonvaStage'
import type { PixelIndex } from '../../types/PixelIndex'
import type { MouseCoords } from '../../types/MouseCoords'

type Props = {
  currentColorHex: string,
  changePixelColor: Function,
  pixelSize: number,
  pixels: Array<number>,
}

type State = {
  pixelPopup: ?PixelIndex,
  pixelHover: ?PixelIndex,
  mousePosition: ?MouseCoords,
}

class CanvasStage extends React.Component<Props, State> {
  state = {
    pixelPopup: null,
    pixelHover: null,
    mousePosition: null,
  }

  onMouseLeave = () => this.setState({ pixelHover: null })

  showPixelPopup = (indexObj: PixelIndex) => this.setState({ pixelPopup: indexObj })

  closePixelPopup = () => this.setState({ pixelPopup: null })

  onPixelHover = (event): void => {
    const containerWidth: number = event.currentTarget.offsetWidth
    const x: number = (event.nativeEvent.layerX === containerWidth) ? containerWidth - 1 : event.nativeEvent.layerX
    const y: number = event.nativeEvent.layerY
    const mousePosition: MouseCoords = { x, y }
    const pixelHover: PixelIndex = this.getPixelIndexByMouseCoordinates({ x, y })
    this.setState({ pixelHover, mousePosition })
  }

  onPixelClick = (event): void => {
    const containerWidth: number = event.target.offsetWidth
    const x: number = (event.nativeEvent.layerX === containerWidth) ? containerWidth - 1 : event.nativeEvent.layerX
    const y: number = event.nativeEvent.layerY
    const indexObj: PixelIndex = this.getPixelIndexByMouseCoordinates({ x, y })

    if (this.props.currentColorHex) {
      this.props.changePixelColor(indexObj)
    } else {
      this.showPixelPopup(indexObj)
    }
  }

  /**
   *
   * @param x - X coordinate of mouse cursor
   * @param y - Y coordinate of mouse cursor
   * @return {{x: number, y: number}} - index coordinates of pixel
   */
  getPixelIndexByMouseCoordinates = ({ x, y }: MouseCoords): PixelIndex => {
    const indexX: number = Math.floor(x / this.props.pixelSize)
    const indexY: number = Math.floor(y / this.props.pixelSize)
    const id: number = indexX + indexY * this.getGridColumns()
    return ({
      id,
      x: indexX,
      y: indexY,
    })
  }

  getGridColumns = () => Math.sqrt(this.props.pixels.length)

  render () {
    const gridColumns = this.getGridColumns()
    const canvasSize = gridColumns * this.props.pixelSize

    return (
      <div className="CanvasStage" onMouseLeave={this.onMouseLeave}>
        {
          this.state.pixelPopup &&
          <CanvasPixelPopup
            pixelPopup={this.state.pixelPopup}
            color={this.props.pixels[ this.state.pixelPopup.id ]}
            pixelSize={this.props.pixelSize}
            onClose={this.closePixelPopup}
          />
        }

        {
          this.state.pixelHover &&
          this.props.currentColorHex && [
            <PixelHoverHighlight
              indexX={this.state.pixelHover.x}
              indexY={this.state.pixelHover.y}
              pixelSize={this.props.pixelSize}
              key="0"
            />,
            <PixelHoverColorPopup
              mousePosition={this.state.mousePosition}
              color={this.props.currentColorHex}
              pixelSize={this.props.pixelSize}
              key="1"
            />
          ]
        }

        <div
          onMouseMove={this.onPixelHover}
          onClick={this.onPixelClick}
        >
          <KonvaStage
            canvasSize={canvasSize}
            currentColorHex={this.props.currentColorHex}
            pixels={this.props.pixels}
            gridColumns={gridColumns}
            pixelSize={this.props.pixelSize}
          />
        </div>
      </div>
    )
  }
}

export default CanvasStage
