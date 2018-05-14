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
  pixelSize: number,
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
    pixelSize: this.props.pixelSize,
    posX: 0,
    posY: 0,
  }

  canvasRef = React.createRef()

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.pixels.length !== this.props.pixels.length) {
      this.onWindowResize()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onMouseLeave = () => this.setState({ pixelHovered: null, mousePosition: null })

  showPixelPopup = (indexObj: PixelIndex) => this.setState({ pixelPopup: indexObj })

  closePixelPopup = () => this.setState({ pixelPopup: null })

  onPixelHover = (event: any): void => {
    const containerWidth: number = event.currentTarget.offsetWidth
    const canvasEl = this.canvasRef.current || {}
    const layerX = event.pageX - canvasEl.offsetLeft
    const layerY = event.pageY - canvasEl.offsetTop
    const x: number = (layerX === containerWidth) ? containerWidth - 1 : layerX
    const y: number = layerY
    const mousePosition: MouseCoords = { x, y }
    const pixelHovered: PixelIndex = this.getPixelIndexByMouseCoordinates({ x, y })
    this.setState({ pixelHovered, mousePosition })
  }

  onPixelClick = (event: any): void => {
    const containerWidth: number = event.target.offsetWidth
    const canvasEl = this.canvasRef.current || {}
    const layerX = event.pageX - canvasEl.offsetLeft
    const layerY = event.pageY - canvasEl.offsetTop
    const x: number = (layerX === containerWidth) ? containerWidth - 1 : layerX
    const y: number = layerY
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

    const canvasEl = this.canvasRef.current || {}
    const layerX = event.pageX - canvasEl.offsetLeft
    const layerY = event.pageY - canvasEl.offsetTop

    const containerWidth = event.currentTarget.offsetWidth
    const containerHeight = event.currentTarget.offsetHeight

    const posX = this.state.posX - (layerX / newScale) + (layerX / this.state.scale)
    const posY = this.state.posY - (layerY / newScale) + (layerY / this.state.scale)

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
    const indexX: number = Math.floor((x + (this.state.posX * this.state.scale)) / (this.state.pixelSize * this.state.scale))
    const indexY: number = Math.floor((y + (this.state.posY * this.state.scale)) / (this.state.pixelSize * this.state.scale))
    const id: number = indexX + indexY * this.getGridColumns()
    return ({
      id,
      x: indexX,
      y: indexY,
    })
  }

  getGridColumns = () => Math.sqrt(this.props.pixels.length)

  getCanvasSize = () => this.getGridColumns() * this.state.pixelSize

  onWindowResize = () => {
    const canvasActualWidth = window.innerWidth - 40
    const canvasFullWidth = this.getGridColumns() * this.props.pixelSize
    const pixelScaleFactor = canvasActualWidth < canvasFullWidth ? canvasActualWidth / canvasFullWidth : 1
    const pixelSize = Math.floor(pixelScaleFactor * this.props.pixelSize)
    this.setState({ pixelSize, scale: 1 })
  }

  render () {
    const gridColumns = this.getGridColumns()
    const canvasSize = this.getCanvasSize()

    return (
      <div>
        <div className="CanvasStage" ref={this.canvasRef}
             onWheel={this.onMouseWheel} onMouseLeave={this.onMouseLeave}>
          <div>
            {
              this.state.pixelPopup &&
              <PixelInfoPopup
                pixelPopup={this.state.pixelPopup}
                offsetX={this.state.posX * this.state.scale}
                offsetY={this.state.posY * this.state.scale}
                colorId={this.props.pixels[ this.state.pixelPopup.id ]}
                pixelSize={this.state.pixelSize * this.state.scale}
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
                    pixelSize={this.state.pixelSize}
                    showDetailsIcon={!this.props.activeColorId}
                  />
                }

                <UserPaintedLoadingPixels
                  pixelSize={this.state.pixelSize}
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
                    pixelSize={this.state.pixelSize}
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
                    pixelSize={this.state.pixelSize}
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
