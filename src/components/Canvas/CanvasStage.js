// @flow
import React from 'react'
import './styles/CanvasStage.css'
import PixelInfoPopup from '../PixelInfoPopup/PixelInfoPopup'
import { PixelHoverHighlight } from './PixelHoverHighlight'
import { PixelHoverColorPopup } from './PixelHoverColorPopup'
import { KonvaStage } from './KonvaStage'
import type { PixelIndex } from '../../types/PixelIndex'
import type { MouseCoords } from '../../types/MouseCoords'
import UserPaintedLoadingPixels from './UserPaintedLoadingPixels'

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
  scale: number,
  posX: number,
  posY: number,
}

const MAX_SCALE = 5
const ZOOM_INTENSITY = 0.05

class CanvasStage extends React.Component<Props, State> {
  state = {
    pixelPopup: null,
    pixelHovered: null,
    mousePosition: null,
    scale: 1,
    posX: 0,
    posY: 0,
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

  onMouseWheel = (event: any) => {
    event.preventDefault()
    const direction = event.deltaY > 0 ? -1 : 1
    const zoom = Math.exp(direction * ZOOM_INTENSITY)
    const newScale = parseFloat(Number(this.state.scale * zoom).toFixed(1))

    if (newScale < 1 || newScale > MAX_SCALE) {
      return
    }

    const mouseX = event.nativeEvent.layerX
    const mouseY = event.nativeEvent.layerY

    const containerWidth = event.currentTarget.offsetWidth
    const containerHeight = event.currentTarget.offsetHeight

    const posX = this.state.posX - (mouseX / newScale) + (mouseX / this.state.scale)
    const posY = this.state.posY - (mouseY / newScale) + (mouseY / this.state.scale)

    const maxPosX = containerWidth - (containerWidth / newScale)
    const maxPosY = containerHeight - (containerHeight / newScale)

    const finalPosX = posX < 0
      ? 0
      : posX > maxPosX
        ? maxPosX
        : posX

    const finalPosY = posY < 0
      ? 0
      : posY > maxPosY
        ? maxPosY
        : posY

    this.setState({ scale: newScale, posX: finalPosX, posY: finalPosY })
  }

  /**
   *
   * @param x - X coordinate of mouse cursor
   * @param y - Y coordinate of mouse cursor
   * @return {{x: number, y: number}} - index coordinates of pixel
   */
  getPixelIndexByMouseCoordinates = ({ x, y }: MouseCoords): PixelIndex => {
    const indexX: number = Math.floor((x + (this.state.posX * this.state.scale)) / (this.props.pixelSize * this.state.scale))
    const indexY: number = Math.floor((y + (this.state.posY * this.state.scale)) / (this.props.pixelSize * this.state.scale))
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
      <div>
        <div className="CanvasStage" onWheel={this.onMouseWheel} onMouseLeave={this.onMouseLeave}>
          <div>
            {
              this.state.pixelPopup &&
              <PixelInfoPopup
                pixelPopup={this.state.pixelPopup}
                offsetX={this.state.posX * this.state.scale}
                offsetY={this.state.posY * this.state.scale}
                colorId={this.props.pixels[ this.state.pixelPopup.id ]}
                pixelSize={this.props.pixelSize * this.state.scale}
                canvasId={this.props.canvasId}
                onCopyColor={this.props.changeActiveColor}
                onClose={this.closePixelPopup}
              />
            }

            <div className="CanvasStage__CameraWrapper">
              <div className="CanvasStage__Camera"
                   style={{ transform: `scale(${this.state.scale}, ${this.state.scale}) translate(${-this.state.posX}px, ${-this.state.posY}px)` }}>
                {
                  this.state.pixelHovered &&
                  <PixelHoverHighlight
                    pixelHovered={this.state.pixelHovered}
                    pixelSize={this.props.pixelSize}
                    showDetailsIcon={!this.props.activeColorId}
                  />
                }

                <UserPaintedLoadingPixels
                  pixelSize={this.props.pixelSize}
                  canvasId={this.props.canvasId}
                />

                {
                  this.state.mousePosition &&
                  this.props.activeColorId > 0 &&
                  <PixelHoverColorPopup
                    mousePosition={this.state.mousePosition}
                    offsetX={this.state.posX}
                    offsetY={this.state.posY}
                    scale={this.state.scale}
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CanvasStage
