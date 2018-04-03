import React from 'react'
import { Alert, Divider } from 'antd'

import './styles/AccountStatus.css'
import withWeb3 from '../../hoc/withWeb3'
import { cutAddress } from '../../helpers/strings'
import { clearTransactions, getTransactions, updateTransactions } from '../../helpers/localStorage'
import { Transaction, TRANSACTION_RECEIPT_STATUS, TRANSACTION_STATUS } from '../../models/Transaction'
import AccountTransactions from './AccountTransactions'

const CHECK_TRANSACTIONS_DELAY = 2000

const StatusDisconnected = () =>
  <Alert
    message="Log in to MetaMask"
    description="Ethereum available but not connected"
    type="error"
    showIcon
  />

const StatusConnected = ({ account }) =>
  <div>
    <b>Connected to Ethereum</b><br />
    <span>{cutAddress(account)}</span>
  </div>

class AccountStatus extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      transactions: getTransactions()
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.checkTransactions()
      this.updateTransactions()
    }, CHECK_TRANSACTIONS_DELAY)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
    this.timer = null
  }

  checkTransactions = () => {
    getTransactions()
      .filter(tx => tx.status === TRANSACTION_STATUS.pending)
      .forEach(tx => {
        console.log(`Checking transaction - ${tx.hash}`)
        this.props.web3.eth.getTransactionReceipt(tx.hash, (error, result) => {
          if (!error && result) {
            const status = TRANSACTION_RECEIPT_STATUS[ Number(result.status) ]
            updateTransactions(new Transaction({ ...tx, status }))
          }
        })
      })
  }

  updateTransactions = () => {
    this.setState({
      transactions: getTransactions()
    })
  }

  onClearTransactions = () => {
    this.setState({ transactions: [] })
    clearTransactions()
  }

  render () {
    return (
      <div className="AccountStatus">
        {!this.props.account && <StatusDisconnected />}
        {
          this.props.account &&
          <div>
            <StatusConnected account={this.props.account} />
            {
              this.state.transactions.length > 0 &&
              <div>
                <Divider />
                <AccountTransactions
                  transactions={this.state.transactions}
                  onClear={this.onClearTransactions}
                />
              </div>
            }
          </div>
        }

      </div>
    )
  }
}

AccountStatus.propTypes = {}
AccountStatus.defaultProps = {}

export default withWeb3(AccountStatus)
