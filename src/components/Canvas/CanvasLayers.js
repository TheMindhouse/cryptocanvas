import React from 'react'
import { Layer, Rect } from 'react-konva'

import PixelsMap from './PixelsMap'

class CanvasLayers extends React.PureComponent {
  /**
   * On mouse hovering a pixel, highlight the pixel and show color popup
   * @param event
   */
  onMouseOver = (event) => {
    if (!this.props.currentColorHex) {
      return
    }

    // console.log(event)
    this.layerHighlight.clear()
    this.pixelHighlight.x(event.target.x())
    this.pixelHighlight.y(event.target.y())
    this.pixelHighlight.show()

    this.updatePixelColorPopupPosition()
  }

  /**
   * When mouse moves out from the pixel, remove the highlight and color popup
   * @param event
   */
  onMouseOut = (event) => {
    // console.log(event)
    this.pixelHighlight.hide()
    this.layerHighlight.draw()
  }

  /**
   * Update position of the color popup when moving the mouse
   * @param event
   */
  onMouseMove = (event) => {
    // console.log(event)
    this.updatePixelColorPopupPosition()
  }

  /**
   * Keeps pixel color popup directly under the mouse pointer
   */
  updatePixelColorPopupPosition = () => {
    const {
      stage,
      scale,
      pixelSize,
    } = this.props
    const mousePos = stage.getPointerPosition()
    this.pixelColorPopup.x((mousePos.x / scale) - (stage.x() / scale) - (pixelSize - 2) / 2)
    this.pixelColorPopup.y((mousePos.y / scale) - (stage.y() / scale) - (pixelSize - 2) / 2)
    this.pixelColorPopup.show()
    this.layerHighlight.draw()
  }

  changePixelColor = (event) => {
    // console.log(event)
    const { x, y } = event.target.position()
    const indexX = x / this.props.pixelSize
    const indexY = y / this.props.pixelSize
    const index = indexY * this.props.gridColumns + indexX
    this.props.changePixelColor({ index, x: indexX, y: indexY })
  }

  render () {
    return [
      <Layer onMouseOver={this.onMouseOver} onClick={this.props.onPixelClick} key="0">
        <PixelsMap pixels={this.props.pixels}
                   pixelSize={this.props.pixelSize}
                   gridColumns={this.props.gridColumns} />
      </Layer>,
      <Layer ref={layer => this.layerHighlight = layer}
             onMouseOut={this.onMouseOut}
             key="1"
      >
        <Rect
          ref={rect => this.pixelHighlight = rect}
          width={this.props.pixelSize}
          height={this.props.pixelSize}
          fill="#000"
          opacity="0.4"
          visible={false}
          onMouseMove={this.onMouseMove}
          onClick={this.changePixelColor}
        />
        <Rect
          ref={rect => this.pixelColorPopup = rect}
          x="0"
          y="0"
          width={this.props.pixelSize - 2}
          height={this.props.pixelSize - 2}
          fill={this.props.currentColorHex}
          visible={false}
          cornerRadius={this.props.pixelSize / 4}
          listening={false}
          stroke="#fff"
          strokeWidth="1"
          shadowColor="#000"
          shadowOpacity="0.6"
          strokeScaleEnabled={false}
          shadowBlur={this.props.pixelSize * 2}
        />
      </Layer>
    ]
  }
}

CanvasLayers.propTypes = {}
CanvasLayers.defaultProps = {}

export default CanvasLayers
