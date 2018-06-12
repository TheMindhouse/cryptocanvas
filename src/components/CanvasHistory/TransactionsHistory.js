// @flow
import * as React from 'react'
import { CONFIG } from '../../config'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { CanvasHistoryTx } from '../../models/CanvasHistoryTx'
import { TransactionsHistoryList } from './TransactionsHistoryList'
import { isAddressNull } from '../../helpers/strings'
import { Link } from 'react-router-dom'
import { URLHelper } from '../../helpers/URLhelper'
import { Spin } from 'antd'

type TransactionsHistoryProps = {
  canvasId: number,
  // from withWeb3
  Contract: ContractModel,
  web3: Object,
  eventsSupported: boolean,
}

type TransactionsHistoryState = {
  transactionsHistory: ?Array<CanvasHistoryTx>,
}

class TransactionsHistory extends React.PureComponent<TransactionsHistoryProps, TransactionsHistoryState> {
  static defaultProps = {}

  state = {
    transactionsHistory: null,
  }

  eventArgs = [ { canvasId: this.props.canvasId }, { fromBlock: CONFIG.START_BLOCK, toBlock: 'latest' } ]

  componentDidMount () {
    if (this.props.eventsSupported) {
      this.getTransactionsHistory()
    }
  }

  getTransactionsHistory = () => {
    const pBidding = this.getBiddingTx()
    const pTrading = this.getTradingTx()
    Promise.all([ pBidding, pTrading ])
      .then(([ biddingTx, tradingTx ]: Array<Array<CanvasHistoryTx>>) => {
        const transactionsHistory: Array<CanvasHistoryTx> = [
          ...biddingTx,
          ...tradingTx,
        ].reverse()
        this.setState({ transactionsHistory })
      })
  }

  getBiddingTx = () => new Promise((resolve, reject) => {
    this.props.Contract.BidPostedEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map((tx, index) => new CanvasHistoryTx({
          name: (index === results.length - 1) ? 'Auction Winner' : 'Auction Bid',
          fromAddress: tx.args.bidder,
          value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
          txHash: tx.transactionHash,
          blockNumber: tx.blockNumber,
          logIndex: tx.logIndex,
        }))
        return resolve(transactions)
      }
      reject(error)
    })
  })

  getTradingTx = () => new Promise((resolve) => {
    const promiseFn = [
      this.getCanvasSoldTx,
      this.getBuyOfferMadeTx,
      this.getBuyOfferCancelledTx,
      this.getSellOfferMadeTx,
      this.getSellOfferCancelledTx
    ]
    return Promise.all(promiseFn.map(fn => fn())).then(resultsArrays => {
      const results = [].concat(...resultsArrays)
      const tradingTx = results.sort((a: CanvasHistoryTx, b: CanvasHistoryTx) => {
        return a.blockNumber - b.blockNumber || a.logIndex - b.logIndex
      })
      resolve(tradingTx)
    })
  })

  getCanvasSoldTx = () => new Promise((resolve, reject) => {
    this.props.Contract.CanvasSoldEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Canvas Sold',
            fromAddress: tx.args.from,
            toAddress: tx.args.to,
            value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
            txHash: tx.transactionHash,
            blockNumber: tx.blockNumber,
            logIndex: tx.logIndex,
          })
        })
        return resolve(transactions)
      }
      reject(error)
    })
  })

  getBuyOfferMadeTx = () => new Promise((resolve, reject) => {
    this.props.Contract.BuyOfferMadeEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Buy Offer',
            fromAddress: tx.args.buyer,
            value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
            txHash: tx.transactionHash,
            blockNumber: tx.blockNumber,
            logIndex: tx.logIndex,
          })
        })
        return resolve(transactions)
      }
      reject(error)
    })
  })

  getBuyOfferCancelledTx = () => new Promise((resolve, reject) => {
    this.props.Contract.BuyOfferCancelledEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Buy Offer Cancelled',
            fromAddress: tx.args.buyer,
            value: this.props.web3.fromWei(parseInt(tx.args.amount, 10), 'ether'),
            txHash: tx.transactionHash,
            blockNumber: tx.blockNumber,
            logIndex: tx.logIndex,
          })
        })
        return resolve(transactions)
      }
      reject(error)
    })
  })

  getSellOfferMadeTx = () => new Promise((resolve, reject) => {
    this.props.Contract.SellOfferMadeEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Sell Offer',
            fromAddress: tx.args.from,
            toAddress: isAddressNull(tx.args.to) ? undefined : tx.args.to,
            value: this.props.web3.fromWei(parseInt(tx.args.minPrice, 10), 'ether'),
            txHash: tx.transactionHash,
            blockNumber: tx.blockNumber,
            logIndex: tx.logIndex,
          })
        })
        return resolve(transactions)
      }
      reject(error)
    })
  })

  getSellOfferCancelledTx = () => new Promise((resolve, reject) => {
    this.props.Contract.SellOfferCancelledEvent(...this.eventArgs).get((error, results) => {
      if (!error && results) {
        const transactions = results.map(tx => {
          return new CanvasHistoryTx({
            name: 'Sell Offer Cancelled',
            fromAddress: tx.args.from,
            toAddress: isAddressNull(tx.args.to) ? undefined : tx.args.to,
            value: this.props.web3.fromWei(parseInt(tx.args.minPrice, 10), 'ether'),
            txHash: tx.transactionHash,
            blockNumber: tx.blockNumber,
            logIndex: tx.logIndex,
          })
        })
        return resolve(transactions)
      }
      reject(error)
    })
  })

  render () {
    return (
      <div>
        <h2><b>Canvas Transaction History</b></h2>
        {
          !this.props.eventsSupported &&
          <p>
            Transaction History available only with MetaMask installed.
            See <Link to={URLHelper.help.installingMetamask}>Installing MetaMask</Link>
          </p>
        }
        {
          this.props.eventsSupported && (
            this.state.transactionsHistory
              ? <TransactionsHistoryList transactions={this.state.transactionsHistory} />
              : <Spin style={{ display: 'block' }} />
          )
        }

      </div>
    )
  }
}

TransactionsHistory = withWeb3(TransactionsHistory)
export { TransactionsHistory }
