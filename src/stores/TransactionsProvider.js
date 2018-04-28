import React from 'react'
import { LocalStorageManager } from '../localStorage'
import { Transaction, TRANSACTION_RECEIPT_STATUS, TRANSACTION_STATUS } from '../models/Transaction'
import withWeb3 from '../hoc/withWeb3'
import { notification } from 'antd'
import { EtherscanLink } from '../components/Small/EtherscanLink'

export const TransactionsContext = React.createContext()

const CHECK_TX_DELAY = 2000

class TransactionsProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: LocalStorageManager.transactions.getTransactions(),
      clearTransactions: this.onClearTransactions
    }
  }

  componentDidMount () {
    this.checkTransactionsInterval = setInterval(() => {
      this.checkTransactions()
      this.updateTransactions()
    }, CHECK_TX_DELAY)
  }

  componentWillUnmount () {
    window.clearInterval(this.checkTransactionsInterval)
    this.checkTransactionsInterval = null
  }

  updateTransactions = () => {
    this.setState({
      transactions: LocalStorageManager.transactions.getTransactions()
    })
  }

  checkTransactions = () => {
    LocalStorageManager.transactions.getTransactions()
      .filter(tx => tx.status === TRANSACTION_STATUS.pending)
      .forEach(tx => {
        console.log(`Checking transaction - ${tx.hash}`)
        this.props.web3.eth.getTransactionReceipt(tx.hash, (error, result) => {
          if (!error && result) {
            const status = TRANSACTION_RECEIPT_STATUS[ Number(result.status) ]
            const newTx = { ...tx, status }
            LocalStorageManager.transactions.updateTransactions(newTx)

            this.showNotification(newTx)
          }
        })
      })
  }

  onClearTransactions = () => {
    this.setState({ transactions: [] })
    LocalStorageManager.transactions.clearTransactions()
  }

  showNotification = (tx: Transaction) => {
    const notificationConfig = {
      description: <p>{tx.name} (<EtherscanLink hash={tx.hash} />)</p>,
      duration: 5,
    }
    switch (tx.status) {
      case TRANSACTION_STATUS.failed:
        return notification.success({...notificationConfig, message: 'Transaction failed'})
      case TRANSACTION_STATUS.completed:
      default:
        return notification.success({...notificationConfig, message: 'Transaction completed'})
    }
  }

  render () {
    return (
      <TransactionsContext.Provider value={this.state}>
        {this.props.children}
      </TransactionsContext.Provider>
    )
  }
}

export default withWeb3(TransactionsProvider)