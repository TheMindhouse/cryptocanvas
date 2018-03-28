import React from 'react'

import './CanvasSidebar.css'

const CanvasSidebar = (props) => {
  const percentCompleted = parseInt((props.paintedPixels / props.totalPixels) * 100, 10)
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">
        {props.paintedPixels} {props.paintedPixels !== 1 ? 'pixels' : 'pixel'} out of {props.totalPixels} painted ({percentCompleted}%)
      </h3>
    </div>
  )
}

CanvasSidebar.propTypes = {}
CanvasSidebar.defaultProps = {}

export default CanvasSidebar
