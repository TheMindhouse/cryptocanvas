import React from 'react'
import { Row, Spin } from 'antd'

const CanvasStagePlaceholder = () => {
  return (
    <Row type="flex" align="middle" justify="center" className="CanvasStage"
         style={{ background: '#ddd', width: '640px', height: '640px' }} >
      <Spin size="large" />
    </Row>
  )
}

CanvasStagePlaceholder.propTypes = {}
CanvasStagePlaceholder.defaultProps = {}

export default CanvasStagePlaceholder
