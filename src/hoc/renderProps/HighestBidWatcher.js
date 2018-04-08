import React, { Component } from 'react'
import { Bid } from '../../models/Bid'
import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'

class HighestBidWatcher extends Component {
  biddingTimer = null

  state = {
    highestBid: null
  }

  componentDidMount () {
    this.getHighestBid()

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  getHighestBid = () => {
    this.props.Contract.getLastBid(this.props.canvasId)
      .then((bid) => {
        console.log(bid)
        if (bid.amount) {
          console.log('New highest bid: ', bid)
          this.updateHighestBid(bid)
        }
      })
  }

  updateHighestBid = (bid) => {
    if (bid.amount) {
      this.setState({ highestBid: bid })
      if (!this.biddingTimer) {
        this.setBiddingTimer()
      }
    } else {
      console.log('Empty bid, skipping!')
    }
  }

  setBiddingTimer = () => {
    const biddingTimeLeftInMs = this.state.highestBid.finishTime * 1000 - Date.now()
    this.biddingTimer = setTimeout(() => {
      this.props.onBiddingFinished()
    }, biddingTimeLeftInMs)
  }

  watchForChanges = (blockNumber) => {
    const bidPostedEvent = this.props.Contract.BidPostedEvent({ _canvasId: this.props.canvasId }, {
      fromBlock: blockNumber,
      toBlock: 'latest'
    })

    bidPostedEvent.watch((error, result) => {
      const bid = new Bid(result.args)
      console.log(`[EVENT] New bid posted: ${bid.amount} by ${bid.bidder}`)
      this.updateHighestBid(bid)
      if (!error)
        console.log(result)
    })

    this.props.events.push(bidPostedEvent)
  }

  render () {
    return this.props.render(this.state)
  }
}

HighestBidWatcher.propTypes = {}
HighestBidWatcher.defaultProps = {}

export default withEvents(withWeb3(HighestBidWatcher))
