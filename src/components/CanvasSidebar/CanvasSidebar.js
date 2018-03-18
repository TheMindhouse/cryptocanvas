import React from 'react'
import PropTypes from 'prop-types'

import './CanvasSidebar.css'

const CanvasSidebar = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #1</h2>
      <h3 className="CanvasSidebar__status">Completed in 90%</h3>
    </div>
  )
}

CanvasSidebar.propTypes = {}
CanvasSidebar.defaultProps = {}

export default CanvasSidebar
