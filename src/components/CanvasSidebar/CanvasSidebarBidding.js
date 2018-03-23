import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import HighestBid from './HighestBid'
import SubmitBid from './SubmitBid'
import BiddingTimeLeft from './BiddingTimeLeft'

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
        submitBid={props.submitBid}
        highestBidAmount={props.highestBidAmount} />

      <Divider />

      <BiddingTimeLeft
        biddingFinishTime={props.biddingFinishTime}
        />
    </div>
  )
}

CanvasSidebarBidding.propTypes = {}
CanvasSidebarBidding.defaultProps = {}

export default CanvasSidebarBidding
