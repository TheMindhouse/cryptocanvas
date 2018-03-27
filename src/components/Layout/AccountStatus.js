import React from 'react'
import PropTypes from 'prop-types'

import './styles/AccountStatus.css'
import withWeb3 from '../../hoc/withWeb3'
import { cutAddress } from '../../helpers/strings'
import { clearTransactions, getTransactions, updateTransactions } from '../../helpers/localStorage'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { Divider } from 'antd'

const StatusDisconnected = () =>
  <div>
    <b>Ethereum Not Connected</b><br />
    <span>Sign in to MetaMask</span>
  </div>

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
    }, 1000)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
    this.timer = null
  }

  checkTransactions = () => {
    console.log('Checking transactions...')
    getTransactions(this.props.canvasId)
      .filter(tx => tx.status === TRANSACTION_STATUS.pending)
      .map(tx => {
        window.web3.eth.getTransaction(tx.hash, (error, result) => {
          if (!error && result) {
            if (result.blockNumber) {
              const updatedTransaction = {
                ...tx,
                status: TRANSACTION_STATUS.completed,
              }
              updateTransactions(updatedTransaction)
            }
          }
        })
      })
  }

  updateTransactions = () => {
    this.setState({
      transactions: getTransactions()
    })
  }

  render () {
    return (
      <div className="AccountStatus">
        {!this.props.account && <StatusDisconnected />}
        {this.props.account && <StatusConnected account={this.props.account} />}
        <Divider />
        {!this.state.transactions.length && <p>No transactions yet</p>}
        {
          this.state.transactions.map((tx, index) =>
            <div key={index}>
              <b>{tx.name}</b> - {tx.status}
            </div>)
        }
        <Divider />
        <b onClick={clearTransactions}>Clear</b>
      </div>
    )
  }
}

AccountStatus.propTypes = {}
AccountStatus.defaultProps = {}

export default withWeb3(AccountStatus)
