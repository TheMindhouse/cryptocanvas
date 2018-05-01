// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { message, Spin } from 'antd'
import { LocalStorageManager } from '../../localStorage'
import { AccountBalanceWithdraw } from './AccountBalanceWithdraw'

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  account: string,  // this is user account
  Contract: ContractModel,
  web3: Object,
}

type State = {
  isLoading: boolean,
  balance: number
}

class AccountBalance extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    isLoading: true,
    balance: 0,
  }

  componentDidMount () {
    this.getBalance()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.setState({ isLoading: true }, this.getBalance)
    }
  }

  getBalance = () => {
    this.props.Contract.getAccountBalance(this.props.accountAddress)
      .then(balance => this.setState({ balance, isLoading: false }))
  }

  onWithdraw = () => {
    this.props.Contract.withdrawBalance()
      .then((tx) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Withdraw Account Balance Transaction sent')
      })
  }

  render () {
    if (this.state.isLoading) {
      return <Spin />
    }

    return (
      <div>
        <h1>{this.props.web3.fromWei(this.state.balance)} ETH</h1>
        {
          this.props.accountAddress === this.props.account &&
          <AccountBalanceWithdraw onWithdraw={this.onWithdraw} balance={this.state.balance} account={this.props.account}/>
        }
      </div>
    )
  }
}

export default withWeb3(AccountBalance)
