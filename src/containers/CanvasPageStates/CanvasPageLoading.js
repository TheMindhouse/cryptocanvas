import React from 'react'
import Row from 'antd/es/grid/row'
import CanvasSidebarLoading from '../../components/CanvasSidebar/CanvasSidebarLoading'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'

const CanvasPageLoading = (props) => {
  return (
    <Row className="CanvasPage" type="flex" justify="space-around" align="top">
      <CanvasStagePlaceholder />
      <CanvasSidebarLoading canvasId={props.canvasId} />
    </Row>
  )
}

CanvasPageLoading.propTypes = {}
CanvasPageLoading.defaultProps = {}

export default CanvasPageLoading
