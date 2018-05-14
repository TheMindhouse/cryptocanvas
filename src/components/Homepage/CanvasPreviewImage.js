import React from 'react'
import { Stage, Layer } from 'react-konva'
import PixelsMap from '../Canvas/PixelsMap'

import canvasBg from '../../assets/images/bg.png'
import './styles/CanvasPreviewImage.css'
import { CONFIG } from '../../config'
import { URLHelper } from '../../helpers/URLhelper'

class CanvasPreviewImage extends React.PureComponent {
  pixelSize = CONFIG.pixelSize.preview

  goToCanvasPage = () => {
    document.location = URLHelper.canvas(this.props.canvasId)
  }

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
          onClick={this.goToCanvasPage}
          onTap={this.goToCanvasPage}
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
