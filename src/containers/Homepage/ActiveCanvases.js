import React from 'react'
import { Button, Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'
import CreateCanvas from '../../components/Homepage/CreateCanvas'
import { PendingTransactionInfo } from '../../components/Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../models/Transaction'
import { CONFIG } from '../../config'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

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
                <CanvasPreview canvasId={canvasId} showPercentCompleted={true}
                               extraRender={() =>
                                 <div className="text-center">
                                   <Link to={URLHelper.canvas(canvasId)}>
                                     <Button type="primary" size="large">Paint this Canvas</Button>
                                   </Link>
                                 </div>
                               }
                />
              </Col>
            )
          }

          {
            this.props.activeCanvasIds.length < CONFIG.MAX_ACTIVE_CANVASES &&
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
