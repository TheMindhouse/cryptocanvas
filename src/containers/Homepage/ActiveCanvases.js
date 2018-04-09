import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'
import CreateCanvas from '../../components/Homepage/CreateCanvas'

const MAX_ACTIVE_CANVASES = 10

class ActiveCanvases extends React.PureComponent {
  render () {
    return (
      <Row gutter={100} type="flex">
        {this.props.activeCanvasIds.map((canvasId, index) =>
          <Col span={6} key={index}>
            <CanvasPreview canvasId={canvasId} showPercentCompleted={true} />
          </Col>
        )}
        {this.props.activeCanvasIds.length < MAX_ACTIVE_CANVASES &&
        <Col span={6}>
          <CreateCanvas />
        </Col>
        }
      </Row>
    )
  }
}

ActiveCanvases.propTypes = {}
ActiveCanvases.defaultProps = {}

export default ActiveCanvases
