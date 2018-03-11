import React from 'react'
import PropTypes from 'prop-types'
import { Rect} from 'react-konva'

const CanvasPixel = (props) => {
  return (
    <Rect
      x={(props.index % props.gridCols) * props.pixelSize}
      y={Math.floor(props.index / props.gridCols) * props.pixelSize}
      width={props.pixelSize}
      height={props.pixelSize}
      fill={props.color}
      opacity={(props.color === 'rgb(255, 255, 255)') ? 0 : 1}
    />
  )
}

CanvasPixel.propTypes = {}
CanvasPixel.defaultProps = {}

export default CanvasPixel
