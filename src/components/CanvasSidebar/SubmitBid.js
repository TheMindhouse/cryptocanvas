import React from 'react'
import { Input, Button, Icon, Modal } from 'antd'
import { PendingTransactionInfo } from '../Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../models/Transaction'
import { CONFIG } from '../../config'
import { TermsInfo } from '../Small/TermsInfo'

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
      bid: event.target.value,
      error: null,
    })
  }

  onSubmitBid = () => {
    if (!this.props.highestBidAmount && this.state.bid < CONFIG.MINIMUM_BID) {
      const error = `Minimum bid is ${CONFIG.MINIMUM_BID} ETH`
      return this.setState({ error })
    }
    if (this.state.bid <= this.props.highestBidAmount) {
      const error = 'Your bid must be higher than the current highest bid'
      return this.setState({ error })
    }

    Modal.confirm({
      title: 'Confirm Make a Bid',
      content: (
        <div>
          <p>
            Do you want to submit <b className="text-nowrap">{this.state.bid} ETH</b> bid for <b className="text-nowrap">Canvas #{this.props.canvasId}</b>?
          </p>
          <TermsInfo />
        </div>
      ),
      okText: 'Submit Bid',
      okType: 'primary',
      onOk: () => this.props.submitBid(this.state.bid),
    })
  }

  getAmountInUSD = () => {
    return parseFloat(this.state.bid * this.state.ethValue).toFixed(2)
  }

  render () {
    return (
      <div>
        <h2><b>Your bid</b></h2>
        <Input type="number" addonAfter="ETH"
               min="0.08"
               placeholder="Enter your offer"
               onChange={this.updateBidAmount}
               onPressEnter={this.onSubmitBid}
               style={{ marginBottom: 15 }}
        />
        {/*(${this.getAmountInUSD()})*/}
        {
          this.state.error &&
          <p className="text-error"><Icon type="exclamation-circle" /> {this.state.error}</p>
        }
        <Button type="primary" onClick={this.onSubmitBid}>Make a Bid</Button>

        <PendingTransactionInfo type={TRANSACTION_TYPE.makeBid} canvasId={this.props.canvasId} />
      </div>
    )
  }
}

SubmitBid.propTypes = {}
SubmitBid.defaultProps = {}

export default SubmitBid
