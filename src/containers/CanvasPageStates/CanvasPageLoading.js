import React from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/es/grid/row'
import CanvasSidebarLoading from '../../components/CanvasSidebar/CanvasSidebarLoading'

const CanvasPageLoading = (props) => {
  return (
    <Row className="CanvasPage" type="flex" justify="space-around" align="top">

      <div className="CanvasStage" style={{ background: '#ddd', width: '640px', height: '640px' }} />

      <div>
        <CanvasSidebarLoading canvasId={props.canvasId} />
      </div>
    </Row>
  )
}

CanvasPageLoading.propTypes = {}
CanvasPageLoading.defaultProps = {}

export default CanvasPageLoading
