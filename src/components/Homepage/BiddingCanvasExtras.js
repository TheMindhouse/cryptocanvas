import React from 'react'
import Countdown from 'react-countdown-now'
import withWeb3 from '../../hoc/withWeb3'

class BiddingCanvasExtras extends React.PureComponent {
  render () {
    const { highestBid } = this.props
    return (
      <div>
        {
          highestBid &&
          <div>
            <small>Last Bid:</small>
            <h2>{parseFloat(this.props.web3.fromWei(highestBid.amount, 'ether'))} ETH</h2>
            <small>Time left:</small>
            <h3 title={new Date(highestBid.finishTime * 1000)}>
              <Countdown date={highestBid.finishTime * 1000} />
            </h3>
          </div>
        }

        {
          !highestBid &&
          <p>No bids yet, be the first!</p>
        }
      </div>
    )
  }
}

BiddingCanvasExtras.propTypes = {}
BiddingCanvasExtras.defaultProps = {}

export default withWeb3(BiddingCanvasExtras)
