// @flow
import * as React from 'react'
import { CONFIG } from '../../config'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { Bid } from '../../models/Bid'
import { CanvasHistoryTx } from '../../models/CanvasHistoryTx'
import { TransactionsHistoryList } from './TransactionsHistoryList'

type Props = {
  canvasId: number,
  Contract: ContractModel,
}

type State = {
  transactionsHistory: Array<CanvasHistoryTx>,
}

class TransactionsHistory extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    transactionsHistory: [],
  }

  componentDidMount () {
    const pBidding = this.getBiddingTx()
    const pCanvasSold = this.getCanvasSoldTx()
    Promise.all([ pBidding, pCanvasSold ])
      .then(([ biddingTx, canvasSoldTx ]: Array<Array<CanvasHistoryTx>>) => {
        const transactionsHistory: Array<CanvasHistoryTx> = [
          ...biddingTx,
          ...canvasSoldTx,
        ].reverse()
        this.setState({ transactionsHistory })
      })
  }

  getBiddingTx = () => new Promise((resolve, reject) => {
    this.props.Contract.BidPostedEvent({ canvasId: this.props.canvasId }, {
      fromBlock: CONFIG.startBlock,
      toBlock: 'latest'
    }).get((error, results) => {
      if (!error && results) {
        const biddingTx = results.map((tx, index) => new CanvasHistoryTx({
          name: (index === results.length - 1) ? 'Highest Bid' : 'Bid',
          fromAddress: tx.args.bidder,
          value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
          txHash: tx.transactionHash,
        }))
        return resolve(biddingTx)
      }
      reject(error)
    })
  })

  getCanvasSoldTx = () => new Promise((resolve, reject) => {
    this.props.Contract.CanvasSoldEvent({ canvasId: this.props.canvasId }, {
      fromBlock: CONFIG.startBlock,
      toBlock: 'latest'
    }).get((error, results) => {
      if (!error && results) {
        const canvasSoldTx = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Canvas Sold',
            fromAddress: tx.args.from,
            toAddress: tx.args.to,
            value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
            txHash: tx.transactionHash,
          })
        })
        return resolve(canvasSoldTx)
      }
      reject(error)
    })
  })

  render () {
    return (
      <div>
        <h2><b>Canvas Transaction History</b></h2>
        <TransactionsHistoryList transactions={this.state.transactionsHistory} />
      </div>
    )
  }
}

TransactionsHistory = withWeb3(TransactionsHistory)
export { TransactionsHistory }
