import React from 'react'
import PropTypes from 'prop-types'

const HighestBid = (props) => {
  console.log(props.highestBidAmount);
  if (props.highestBidAmount) {
    return (
      <div>
        <h2>Current Highest Bid</h2>
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
