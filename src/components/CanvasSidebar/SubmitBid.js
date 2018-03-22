import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'

class SubmitBid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      bid: this.props.minimumBid || 0.1,
      ethValue: 566.55
    }
  }

  updateBidAmount = (event) => {
    this.setState({
      bid: event.target.value
    })
  }

  onSubmitBid = () => {
    this.props.submitBid(this.state.bid)
  }

  getAmountInUSD = () => {
    return parseFloat(this.state.bid * this.state.ethValue).toFixed(2)
  }

  render () {
    return (
      <div>
        <h2>Your bid</h2>
        <Input type="number" addonAfter="ETH" defaultValue="0.1" onChange={this.updateBidAmount} onPressEnter={this.onSubmitBid} />
        (${this.getAmountInUSD()})
        <br /><br />
        <Button type="primary" onClick={this.onSubmitBid}>Submit Bid</Button>
      </div>
    )
  }
}

SubmitBid.propTypes = {}
SubmitBid.defaultProps = {}

export default SubmitBid
