import React from 'react'
import PropTypes from 'prop-types'

import './CanvasSidebar.css'

const CanvasSidebar = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">3686 pixels out of 4096 painted (90%)</h3>
    </div>
  )
}

CanvasSidebar.propTypes = {}
CanvasSidebar.defaultProps = {}

export default CanvasSidebar
