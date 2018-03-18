import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

const CanvasSidebarLoading = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Loading...</h3>
      <br />
      <br />
      <Spin size="large"/>
    </div>
  )
}

CanvasSidebarLoading.propTypes = {}
CanvasSidebarLoading.defaultProps = {}

export default CanvasSidebarLoading
