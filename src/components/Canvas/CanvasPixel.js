import React from 'react'
import { Rect } from 'react-konva'

class CanvasPixel extends React.PureComponent {
  render () {
    const x = (this.props.index % this.props.gridCols) * this.props.pixelSize
    const y = Math.floor(this.props.index / this.props.gridCols) * this.props.pixelSize
    return (
      <Rect
        ref="pixel"
        x={x}
        y={y}
        width={this.props.pixelSize}
        height={this.props.pixelSize}
        fill={this.props.color}
        opacity={(this.props.color === 'rgb(255, 255, 255)') ? 0 : 1}
      />
    )
  }
}

CanvasPixel.propTypes = {}
CanvasPixel.defaultProps = {}

export default CanvasPixel
