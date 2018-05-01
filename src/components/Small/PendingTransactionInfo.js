// @flow
import * as React from 'react'
import withTransactions from '../../hoc/withTransactions'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { TransactionWithCanvasId } from '../../models/transactions/TransactionWithCanvasId'
import { Alert } from 'antd'
import { EtherscanLink } from './EtherscanLink'
import withWeb3 from '../../hoc/withWeb3'

type Props = {
  type: string|Array<string>,
  canvasId?: number,
  style?: Object,
  // withTransactions
  txStore: {
    transactions: Array<Transaction>
  },
  // withWeb3
  account: string
}

class PendingTransactionInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  isCorrectTxType = (type: string) => {
      if (Array.isArray(this.props.type)) {
        return this.props.type.includes(type)
      }
      return this.props.type === type
  }

  getPendingTransactions = () => {
    const pendingTx = this.props.txStore.transactions.filter((tx: Transaction | TransactionWithCanvasId) =>
      tx.status === TRANSACTION_STATUS.pending &&
      this.isCorrectTxType(tx.type) &&
      tx.account === this.props.account &&
      (!this.props.canvasId || tx.canvasId === this.props.canvasId)
    )
    return pendingTx.map((tx: Transaction) => (
      <div key={tx.hash} style={{ marginTop: 10 }}>
        <Alert message={<small>{tx.name} transaction pending (<EtherscanLink hash={tx.hash} />)</small>}
               type="info" showIcon iconType="loading" style={this.props.style}/>
      </div>
    ))
  }

  render () {
    const pendingTransactions = this.getPendingTransactions()
    if (pendingTransactions.length > 0) {
      return (<div style={{ marginTop: 20 }}>{pendingTransactions}</div>)
    }
    return null
  }
}

PendingTransactionInfo = withTransactions(withWeb3(PendingTransactionInfo))
export { PendingTransactionInfo }
