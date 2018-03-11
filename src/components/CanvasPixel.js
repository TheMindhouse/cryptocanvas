import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

const CanvasPixel = (props) => {
  const x = (props.index % props.gridCols) * props.pixelSize
  const y = Math.floor(props.index / props.gridCols) * props.pixelSize
  const bindedPixelClick = props.handlePixelClick.bind(null, { index: props.index, x, y })
  return (
    <Rect
      x={x}
      y={y}
      width={props.pixelSize}
      height={props.pixelSize}
      fill={props.color}
      opacity={(props.color === 'rgb(255, 255, 255)') ? 0 : 1}
      onClick={bindedPixelClick}
    />
  )
}

CanvasPixel.propTypes = {}
CanvasPixel.defaultProps = {}

export default CanvasPixel
