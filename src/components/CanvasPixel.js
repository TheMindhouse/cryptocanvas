import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

class CanvasPixel extends React.PureComponent {
  render () {
    const x = (this.props.index % this.props.gridCols) * this.props.pixelSize
    const y = Math.floor(this.props.index / this.props.gridCols) * this.props.pixelSize
    const bindedPixelClick = this.props.handlePixelClick.bind(null, { index: this.props.index, x, y })
    return (
      <Rect
        ref="pixel"
        x={x}
        y={y}
        width={this.props.pixelSize}
        height={this.props.pixelSize}
        fill={this.props.color}
        fillOriginal={this.props.color}
        opacity={(this.props.color === 'rgb(255, 255, 255)') ? 0 : 1}
        opacityOriginal={(this.props.color === 'rgb(255, 255, 255)') ? 0 : 1}
        onClick={bindedPixelClick}
      />
    )
  }
}

CanvasPixel.propTypes = {}
CanvasPixel.defaultProps = {}

export default CanvasPixel
