import React from 'react'
import { Alert } from 'antd'

const HighestBid = (props) => {
  if (props.highestBidAmount) {
    return (
      <div>
        <h2>Current Highest Bid</h2>
        {
          props.isUserHighestBidder &&
          <div>
            <Alert message="Your bid is currently the highest!" type="success" showIcon />
            <br />
          </div>
        }
        <h2>{props.highestBidAmount} ETH</h2>
        <small>by {props.highestBidAddress}</small>
      </div>
    )
  }
  return (
    <div>
      <h2>Current Highest Bid</h2>
      <p>No bids yet</p>
    </div>
  )
}

HighestBid.propTypes = {}
HighestBid.defaultProps = {}

export default HighestBid
