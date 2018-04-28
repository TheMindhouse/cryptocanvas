// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { Button, Spin, Modal, message } from 'antd'
import { LocalStorageManager } from '../../localStorage'

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
    this.props.Contract.getAccountBalance(this.props.accountAddress)
      .then(balance => this.setState({ balance, isLoading: false }))
  }

  confirm = () => {
    Modal.confirm({
      title: 'Withdraw your Account Balance?',
      content: 'It will be visible on your wallet after a few minutes, when the blockchain updates.',
      okText: 'Withdraw',
      okType: 'primary',
      width: 500,
      onOk: this.onWithdraw,
    })
  }

  onWithdraw = () => {
    this.props.Contract.withdrawBalance()
      .then((tx) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Withdraw Account Balance Transaction sent')
      })
  }

  render() {
    if (this.state.isLoading) {
      return <Spin />
    }

    return (
      <div>
      <h1>{this.props.web3.fromWei(this.state.balance)} ETH</h1>
        {
          this.props.accountAddress === this.props.account &&
          <Button
            type="primary"
            size="default"
            onClick={this.confirm}
            disabled={!this.state.balance}>
            Withdraw
          </Button>
        }
      </div>
    )
  }
}

export default withWeb3(AccountBalance)
