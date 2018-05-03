import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'
import CreateCanvas from '../../components/Homepage/CreateCanvas'
import { PendingTransactionInfo } from '../../components/Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../models/Transaction'

const MAX_ACTIVE_CANVASES = 10

class ActiveCanvases extends React.PureComponent {
  render () {
    return (
      <div>
        <Row gutter={100} type="flex">
          {
            !this.props.activeCanvasIds.length &&
            <Col span={24}>
              <p className="NoCanvasInfo">No active canvases, but you can create a new one</p>
            </Col>
          }

          {
            this.props.activeCanvasIds.map((canvasId, index) =>
              <Col xs={24} sm={12} md={6} key={index}>
                <CanvasPreview canvasId={canvasId} showPercentCompleted={true} />
              </Col>
            )
          }

          {
            this.props.activeCanvasIds.length < MAX_ACTIVE_CANVASES &&
            <Col xs={24} sm={12} md={6}>
              <CreateCanvas />
            </Col>
          }
        </Row>

        <PendingTransactionInfo type={TRANSACTION_TYPE.createCanvas} style={{ display: 'inline-block' }} />
      </div>
    )
  }
}

ActiveCanvases.propTypes = {}
ActiveCanvases.defaultProps = {}

export default ActiveCanvases
