import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'

class FinishedCanvases extends React.PureComponent {
  render () {
    return (
      <Row gutter={100}>
        <h2>Finished Canvas Gallery</h2>
        {this.props.canvasIds.map((canvasId, index) =>
          <Col span={6} key={index}>
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
