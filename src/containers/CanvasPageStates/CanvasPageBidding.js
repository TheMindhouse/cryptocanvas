import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/es/grid/row'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebar from '../../components/CanvasSidebar/CanvasSidebar'
import CanvasSidebarBidding from '../../components/CanvasSidebar/CanvasSidebarBidding'
import { Bid } from '../../models/Bid'

class CanvasPageBidding extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
      highestBidAmount: null,
      highestBidAddress: '',
    }
  }

  componentDidMount () {
    this.getCanvas()
    this.getHighestBid()
    this.watchForChanges()
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
    this.props.Contract.getLastBid(this.props.canvasId).then(this.updateHighestBid)
  }

  updateHighestBid = (bid) => {
    console.log('Highest bid: ', bid)
    this.setState({
      highestBidAmount: this.props.web3.fromWei(bid.amount, 'ether'),
      highestBidAddress: bid.bidder,
    })

  }

  watchForChanges = () => {
    const { blockNumber } = this.props.web3.eth
    const bidPostedEvent = this.props.Contract.BidPostedEvent({}, { fromBlock: blockNumber, toBlock: 'latest' })

    bidPostedEvent.watch((error, result) => {
      const bid = new Bid(result.args)
      console.log(`[EVENT] New bid posted: ${bid.amount} by ${bid.bidder}`)
      this.updateHighestBid(bid)
      if (!error)
        console.log(result)
    })
  }

  submitBid = (bidAmountInEth) => {
    const bidAmountInWei = this.props.web3.toWei(bidAmountInEth, 'ether')
    console.log(`User posting new bid: ${bidAmountInEth} (${bidAmountInWei} Wei)`)
    this.props.Contract.makeBid({ canvasId: this.props.canvasId, bidAmountInWei })
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
            highestBidAmount={this.state.highestBidAmount}
            highestBidAddress={this.state.highestBidAddress}
            submitBid={this.submitBid}
          />
        </div>
      </Row>
    )
  }
}

CanvasPageBidding.propTypes = {}
CanvasPageBidding.defaultProps = {}

export default CanvasPageBidding
