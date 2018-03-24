import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import PixelsMap from '../Canvas/PixelsMap'

import canvasBg from '../../assets/images/bg.png'
import './styles/CanvasPreviewImage.css'

class CanvasPreviewImage extends React.PureComponent {
  pixelSize = 20

  render () {
    const gridColumns = Math.sqrt(this.props.pixels.length)
    const canvasSize = gridColumns * this.pixelSize

    return (
      <div className="CanvasPreviewImage">
        <Stage
          width={canvasSize}
          height={canvasSize}
          className="CanvasPreviewImage__stage"
          style={{
            'background': `url(${canvasBg})`,
            'backgroundSize': this.props.pixelSize,
          }}
        >
          <Layer>
            <PixelsMap
              pixels={this.props.pixels}
              pixelSize={this.pixelSize}
              gridColumns={gridColumns}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

CanvasPreviewImage.propTypes = {}
CanvasPreviewImage.defaultProps = {}

export default CanvasPreviewImage
