import React, { Component } from 'react'
import Row from 'antd/es/grid/row'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarBidding from '../../components/CanvasSidebar/CanvasSidebarBidding'
import { Bid } from '../../models/Bid'
import { updateTransactions } from '../../helpers/localStorage'
import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'

class CanvasPageBidding extends Component {
  biddingTimer = null

  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
      highestBidAmount: null,
      highestBidAddress: '',
      biddingFinishTime: null,  // In seconds from Epoch
    }
  }

  componentDidMount () {
    this.getCanvas()
    this.getHighestBid()
    this.props.getBlockNumber().then(this.watchForChanges)
  }

  getCanvas = () => {
    // Temporary store canvas in local storage
    const tempCanvas = window.localStorage.getItem('tempCanvas2')

    if (tempCanvas) {
      this.setState({
        pixels: JSON.parse(tempCanvas),
        isLoading: false,
      })
      return
    }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        window.localStorage.setItem('tempCanvas', JSON.stringify(pixels))
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  getHighestBid = () => {
    this.props.Contract.getLastBid(this.props.canvasId)
      .then((bid) => {
        console.log(bid)
        this.updateHighestBid(bid)
      })
  }

  updateHighestBid = (bid) => {
    if (bid.amount) {
      console.log('New highest bid: ', bid)
      this.setState({
        highestBidAmount: parseFloat(this.props.web3.fromWei(bid.amount, 'ether')),
        highestBidAddress: bid.bidder,
      })

      if (!this.biddingTimer) {
        this.setBiddingTimer(bid.finishTime)
      }
    }
  }

  setBiddingTimer = (finishTimeInSeconds) => {
    this.setState({ biddingFinishTime: finishTimeInSeconds })
    const biddingTimeLeftInMs = finishTimeInSeconds * 1000 - Date.now()
    this.biddingTimer = setTimeout(() => {
      this.props.onFinishBidding()
    }, biddingTimeLeftInMs)
  }

  watchForChanges = (blockNumber) => {
    const bidPostedEvent = this.props.Contract.BidPostedEvent({}, { fromBlock: blockNumber, toBlock: 'latest' })

    bidPostedEvent.watch((error, result) => {
      const bid = new Bid(result.args)
      console.log(`[EVENT] New bid posted: ${bid.amount} by ${bid.bidder}`)
      this.updateHighestBid(bid)
      if (!error)
        console.log(result)
    })

    this.props.events.push(bidPostedEvent)
  }

  submitBid = (bidAmountInEth) => {
    const bidAmountInWei = this.props.web3.toWei(bidAmountInEth, 'ether')
    console.log(`User posting new bid: ${bidAmountInEth} (${bidAmountInWei} Wei)`)

    this.props.Contract.makeBid({ canvasId: this.props.canvasId, bidAmountInWei })
      .then(transaction => updateTransactions(transaction))
  }

  render () {
    return (
      <Row className="CanvasPage" type="flex" justify="space-around" align="top">

        {this.state.isLoading && <p>Canvas loading...</p>}

        <CanvasStage
          pixelSize={this.props.pixelSize}
          pixels={this.state.pixels}
        />

        <div>
          <CanvasSidebarBidding
            canvasId={this.props.canvasId}
            isUserHighestBidder={this.props.account === this.state.highestBidAddress}
            highestBidAmount={this.state.highestBidAmount}
            highestBidAddress={this.state.highestBidAddress}
            biddingFinishTime={this.state.biddingFinishTime}
            submitBid={this.submitBid}
          />
        </div>
      </Row>
    )
  }
}

CanvasPageBidding.propTypes = {}
CanvasPageBidding.defaultProps = {}

export default withEvents(withWeb3(CanvasPageBidding))
