// @flow
import React from 'react'
import './styles/CanvasStage.css'
import PixelInfoPopup from '../PixelInfoPopup/PixelInfoPopup'
import { PixelHoverHighlight } from './PixelHoverHighlight'
import { PixelHoverColorPopup } from './PixelHoverColorPopup'
import { KonvaStage } from './KonvaStage'
import type { PixelIndex } from '../../types/PixelIndex'
import type { MouseCoords } from '../../types/MouseCoords'

type Props = {
  canvasId: number,
  pixelSize: number,
  pixels: Array<number>,
  activeColorId: number,
  changePixelColor: (PixelIndex) => void,
  changeActiveColor: (number) => void,
}

type State = {
  pixelPopup: ?PixelIndex,
  pixelHovered: ?PixelIndex,
  mousePosition: ?MouseCoords,
}

class CanvasStage extends React.Component<Props, State> {
  state = {
    pixelPopup: null,
    pixelHovered: null,
    mousePosition: null,
  }

  onMouseLeave = () => this.setState({ pixelHovered: null, mousePosition: null })

  showPixelPopup = (indexObj: PixelIndex) => this.setState({ pixelPopup: indexObj })

  closePixelPopup = () => this.setState({ pixelPopup: null })

  onPixelHover = (event: any): void => {
    const containerWidth: number = event.currentTarget.offsetWidth
    const x: number = (event.nativeEvent.layerX === containerWidth) ? containerWidth - 1 : event.nativeEvent.layerX
    const y: number = event.nativeEvent.layerY
    const mousePosition: MouseCoords = { x, y }
    const pixelHovered: PixelIndex = this.getPixelIndexByMouseCoordinates({ x, y })
    this.setState({ pixelHovered, mousePosition })
  }

  onPixelClick = (event: any): void => {
    const containerWidth: number = event.target.offsetWidth
    const x: number = (event.nativeEvent.layerX === containerWidth) ? containerWidth - 1 : event.nativeEvent.layerX
    const y: number = event.nativeEvent.layerY
    const indexObj: PixelIndex = this.getPixelIndexByMouseCoordinates({ x, y })

    if (this.props.activeColorId) {
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
          <PixelInfoPopup
            pixelPopup={this.state.pixelPopup}
            colorId={this.props.pixels[ this.state.pixelPopup.id ]}
            pixelSize={this.props.pixelSize}
            canvasId={this.props.canvasId}
            onCopyColor={this.props.changeActiveColor}
            onClose={this.closePixelPopup}
          />
        }

        {
          this.state.pixelHovered &&
          <PixelHoverHighlight
            pixelHovered={this.state.pixelHovered}
            pixelSize={this.props.pixelSize}
          />
        }

        {
          this.state.mousePosition &&
          this.props.activeColorId > 0 &&
          <PixelHoverColorPopup
            mousePosition={this.state.mousePosition}
            colorId={this.props.activeColorId}
            pixelSize={this.props.pixelSize}
          />
        }

        <div
          onMouseMove={this.onPixelHover}
          onClick={this.onPixelClick}
        >
          <KonvaStage
            canvasSize={canvasSize}
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
