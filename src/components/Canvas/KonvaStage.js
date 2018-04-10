import * as React from 'react'

import { Stage, Layer } from 'react-konva'

import canvasBg from '../../assets/images/bg.png'
import PixelsMap from './PixelsMap'

type Props = {}

class KonvaStage extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <Stage
        width={this.props.canvasSize}
        height={this.props.canvasSize}
        style={{
          'background': `url(${canvasBg})`,
          'backgroundSize': this.props.pixelSize,
          'width': this.props.canvasSize,
          'cursor': (this.props.currentColorHex || this.props.scale > 1) ? 'pointer' : 'default'
        }}
        draggable={false}
      >
        <Layer>
          <PixelsMap pixels={this.props.pixels}
                     pixelSize={this.props.pixelSize}
                     gridColumns={this.props.gridColumns}
          />
        </Layer>
      </Stage>
    )
  }
}

export { KonvaStage }
