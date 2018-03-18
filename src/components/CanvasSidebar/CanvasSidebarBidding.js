import React from 'react'
import PropTypes from 'prop-types'

const CanvasSidebarBidding = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Initial Bidding</h3>
    </div>
  )
}

CanvasSidebarBidding.propTypes = {}
CanvasSidebarBidding.defaultProps = {}

export default CanvasSidebarBidding
