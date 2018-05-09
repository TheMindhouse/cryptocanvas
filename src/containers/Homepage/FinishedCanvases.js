import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'

class FinishedCanvases extends React.PureComponent {
  render () {
    return (
      <Row gutter={100} type="flex">
        {this.props.canvasIds.map((canvasId) =>
          <Col xs={24} sm={12} md={6} key={canvasId}>
            <CanvasPreview canvasId={canvasId} />
          </Col>
        )}
      </Row>
    )
  }
}

FinishedCanvases.propTypes = {}
FinishedCanvases.defaultProps = {}

export default FinishedCanvases
