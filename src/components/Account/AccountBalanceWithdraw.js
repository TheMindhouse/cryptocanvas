// @flow
import * as React from 'react'
import withTransactions from '../../hoc/withTransactions'
import { Button, Modal } from 'antd'
import { Transaction, TRANSACTION_TYPE } from '../../models/Transaction'
import { PendingTransactionInfo } from '../Small/PendingTransactionInfo'

type Props = {
  balance: number,
  onWithdraw: () => void,
  account: string,
  txStore: {
    transactions: Array<Transaction>
  },
}

class AccountBalanceWithdraw extends React.PureComponent<Props> {
  static defaultProps = {}

  confirm = () => {
    Modal.confirm({
      title: 'Withdraw Account Balance?',
      content: 'It will be visible in your wallet after a few minutes, when the blockchain updates.',
      okText: 'Withdraw',
      okType: 'primary',
      width: 500,
      onOk: this.props.onWithdraw,
    })
  }

  render () {
    return (
      <div>
        <Button
          type="primary"
          size="default"
          onClick={this.confirm}
          disabled={!this.props.balance}>
          Withdraw
        </Button>

        <PendingTransactionInfo type={TRANSACTION_TYPE.withdrawBalance} style={{ display: 'inline-block' }} />
      </div>
    )
  }
}

AccountBalanceWithdraw = withTransactions(AccountBalanceWithdraw)
export { AccountBalanceWithdraw }
