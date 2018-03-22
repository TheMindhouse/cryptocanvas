import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import HighestBid from './HighestBid'
import SubmitBid from './SubmitBid'

const CanvasSidebarBidding = (props) => {
  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Initial Bidding</h3>

      <Divider />

      <HighestBid
        highestBidAmount={props.highestBidAmount}
        highestBidAddress={props.highestBidAddress} />

      <Divider />

      <SubmitBid
        submitBid={props.submitBid} />

      <Divider />

      <h2>Bidding Time Left</h2>
      <p>Bidding is open to anyone now. After the first bid is placed, bidding will remain available for the next 48 hours.</p>
    </div>
  )
}

CanvasSidebarBidding.propTypes = {}
CanvasSidebarBidding.defaultProps = {}

export default CanvasSidebarBidding
