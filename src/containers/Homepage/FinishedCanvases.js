import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'

class FinishedCanvases extends React.PureComponent {
  render () {
    return (
      <div className="overflow-hidden">
        <Row gutter={100} type="flex">
          {this.props.canvasIds.map((canvasId, index) =>
            <Col span={6} key={index}>
              <CanvasPreview canvasId={canvasId} />
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

FinishedCanvases.propTypes = {}
FinishedCanvases.defaultProps = {}

export default FinishedCanvases
