// @flow
import * as React from 'react'
import { ContractModel } from '../../models/ContractModel'
import withWeb3 from '../../hoc/withWeb3'
import { CANVAS_STATES } from '../../models/CanvasState'
import Spin from 'antd/es/spin/index'
import { Bid } from '../../models/Bid'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  Contract: ContractModel,
  account: string,
  web3: Object,
}

type State = {
  highestBids: Array<Bid>,
  isLoading: boolean,
}

class HighestBids extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    highestBids: [],
    isLoading: true,
  }

  componentDidMount () {
    this.getHighestBids()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.setState({ isLoading: true }, this.getHighestBids)
    }
  }

  getHighestBids = () => {
    if (!this.props.accountAddress) {
      return
    }
    this.props.Contract.getCanvasIdsByState(CANVAS_STATES.bidding)
      .then(biddingCanvasesIds => {
        const pCanvasesBids = biddingCanvasesIds.map(canvasId => this.props.Contract.getLastBid(canvasId))
        Promise.all(pCanvasesBids).then((canvasesBids: Array<Bid>) => {
          const highestBids = canvasesBids
            .filter(canvasBid => canvasBid.bidder === this.props.accountAddress)
          this.setState({ highestBids, isLoading: false })
        })
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <div>
          <h2><b>Current Highest Bids</b></h2>
          <Spin />
        </div>
      )
    }

    return (
      <div>
        <h2>
          <b>{this.state.highestBids.length} Current Highest Bids </b>
          {this.state.highestBids.length > 0 ? <span className="emoji-rocket" /> : ''}
        </h2>
        {
          this.state.highestBids.map((bid: Bid) =>
            <p key={bid.canvasId}>
              <Link to={URLHelper.canvas(bid.canvasId)}>Canvas
                #{bid.canvasId}</Link> - <b>{this.props.web3.fromWei(bid.amount, 'ether')} ETH</b>
            </p>
          )
        }
      </div>
    )
  }
}

export default withWeb3(HighestBids)
