import React from 'react'
import { Alert } from 'antd'
import { cutAddress } from '../../helpers/strings'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

const HighestBid = (props) => {
  if (props.highestBidAmount) {
    return (
      <div>
        <h2><b>Current Highest Bid</b></h2>
        {
          props.isUserHighestBidder &&
          <div>
            <Alert message="Your bid is currently the highest!" type="success" showIcon />
            <br />
          </div>
        }
        <h2>{props.highestBidAmount} ETH</h2>
        <small>by <Link to={URLHelper.account(props.highestBidAddress)}>{cutAddress(props.highestBidAddress)}</Link></small>
      </div>
    )
  }
  return (
    <div>
      <h2><b>Current Highest Bid</b></h2>
      <p>No bids yet</p>
    </div>
  )
}

HighestBid.propTypes = {}
HighestBid.defaultProps = {}

export default HighestBid
