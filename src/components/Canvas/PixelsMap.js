import React from 'react'
import CanvasPixel from './CanvasPixel'

const PixelsMap = (props) => {
  return [
    props.pixels.map((color, index) =>
      <CanvasPixel
        color={color}
        index={index}
        pixelSize={props.pixelSize}
        gridColumns={props.gridColumns}
        key={index}
      />
    )
  ]
}

PixelsMap.propTypes = {}
PixelsMap.defaultProps = {}

export default PixelsMap
