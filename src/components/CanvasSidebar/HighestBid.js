import React from 'react'
import { Alert } from 'antd'

const HighestBid = (props) => {
  if (props.highestBidAmount) {
    return (
      <div>
        <h2>Current Highest Bid</h2>
        { props.isUserHighestBidder &&
        <Alert message="Your bid is currently the highest!" type="success" showIcon />
        }
        <h3>{props.highestBidAmount} ETH</h3>
        <p>by {props.highestBidAddress}</p>
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
