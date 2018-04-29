// @flow
import * as React from 'react'
import { ContractModel } from '../../models/ContractModel'
import withWeb3 from '../../hoc/withWeb3'
import { CANVAS_STATES } from '../../models/CanvasState'
import { CanvasInfo } from '../../models/CanvasInfo'
import { Col, Row } from 'antd'
import CanvasPreview from '../Homepage/CanvasPreview'
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
      return <Spin />
    }

    return (
      <div>
        <h3>
          {
            this.props.accountAddress === this.props.account
              ? 'You are leading the Initial Bidding of '
              : 'User with this address is leading the Initial Bidding of  '
          }
          <b>{this.state.highestBids.length}</b> {this.state.highestBids.length !== 1 ? 'canvases' : 'canvas'}
          {this.state.highestBids.length > 0 ? <span className="emoji-rocket" /> : '.' }
        </h3>
        <br />
        {
          this.state.highestBids.map((bid: Bid) =>
            <p key={bid.canvasId}>
              <Link to={URLHelper.canvas(bid.canvasId)}>Canvas #{bid.canvasId}</Link> - <b>{this.props.web3.fromWei(bid.amount, 'ether')} ETH</b>
            </p>
          )
        }
      </div>
    )
  }
}

export default withWeb3(HighestBids)
