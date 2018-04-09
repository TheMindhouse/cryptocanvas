import React from 'react'
import { Col, Row } from 'antd'
import CanvasPreview from '../../components/Homepage/CanvasPreview'
import BiddingCanvasExtras from '../../components/Homepage/BiddingCanvasExtras'
import HighestBidWatcher from '../../hoc/renderProps/HighestBidWatcher'

class BiddingCanvases extends React.PureComponent {
  render () {
    const { onBiddingFinished } = this.props
    return (
      <Row gutter={100}>
        <h2>Initial Bidding</h2>
        <Row gutter={100} type="flex">
          {this.props.canvasIds.map((canvasId, index) =>
            <Col span={6} key={index}>
              <CanvasPreview
                canvasId={canvasId}
                extraRender={() =>
                  <HighestBidWatcher
                    canvasId={canvasId}
                    onBiddingFinished={onBiddingFinished}
                    render={(state) => <BiddingCanvasExtras {...state} /> } />
                }
              />
            </Col>
          )}
        </Row>
      </Row>
    )
  }
}

BiddingCanvases.propTypes = {}
BiddingCanvases.defaultProps = {}

export default BiddingCanvases
