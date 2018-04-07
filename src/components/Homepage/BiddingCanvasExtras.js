import React from 'react'
import Countdown from 'react-countdown-now'
import withWeb3 from '../../hoc/withWeb3'

class BiddingCanvasExtras extends React.PureComponent {
  state = {
    highestBid: null
  }

  componentDidMount () {
    this.getHighestBid()
  }

  getHighestBid = () => {
    this.props.Contract.getLastBid(this.props.canvasId)
      .then((bid) => {
        console.log(bid)
        if (bid.amount) {
          console.log('New highest bid: ', bid)
          this.setState({ highestBid: bid })
        }
      })
  }

  render () {
    return (
      <div>
        {
          this.state.highestBid &&
          <div>
            <small>Last Bid:</small>
            <h2>{parseFloat(this.props.web3.fromWei(this.state.highestBid.amount, 'ether'))} ETH</h2>
            <small>Time left:</small>
            <h3 title={new Date(this.state.highestBid.finishTime * 1000)}>
              <Countdown date={this.state.highestBid.finishTime * 1000} />
            </h3>
          </div>
        }

        {
          !this.state.highestBid &&
          <p>No bids yet, be the first!</p>
        }
      </div>
    )
  }
}

BiddingCanvasExtras.propTypes = {}
BiddingCanvasExtras.defaultProps = {}

export default withWeb3(BiddingCanvasExtras)
