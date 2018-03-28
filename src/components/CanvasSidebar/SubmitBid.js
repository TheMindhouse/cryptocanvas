import React from 'react'
import { Input, Button } from 'antd'

class SubmitBid extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      bid: null,
      ethValue: 566.55,
      error: null,
    }
  }

  updateBidAmount = (event) => {
    this.setState({
      bid: event.target.value
    })
  }

  onSubmitBid = () => {
    if (this.state.bid <= this.props.highestBidAmount) {
      const error = 'Your bid must be higher than the current highest bid.'
      this.setState({ error })
      return
    }
    this.props.submitBid(this.state.bid)
  }

  getAmountInUSD = () => {
    return parseFloat(this.state.bid * this.state.ethValue).toFixed(2)
  }

  render () {
    return (
      <div>
        <h2>Your bid</h2>
        <Input type="text" addonAfter="ETH"
               placeholder="Enter your offer"
               onChange={this.updateBidAmount}
               onPressEnter={this.onSubmitBid} />
        (${this.getAmountInUSD()})
        <p>{this.state.error}</p>
        <Button type="primary" onClick={this.onSubmitBid}>Submit Bid</Button>
      </div>
    )
  }
}

SubmitBid.propTypes = {}
SubmitBid.defaultProps = {}

export default SubmitBid
