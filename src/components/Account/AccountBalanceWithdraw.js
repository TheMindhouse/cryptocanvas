// @flow
import * as React from 'react'
import withTransactions from '../../hoc/withTransactions'
import { Alert, Button, Modal, Spin } from 'antd'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { WithdrawBalanceTransaction } from '../../models/transactions/WithdrawBalanceTransaction'
import { EtherscanLink } from '../Small/EtherscanLink'

type Props = {
  balance: number,
  onWithdraw: () => void,
  account: string,
  txStore: {
    transactions: Array<Transaction | WithdrawBalanceTransaction>
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

  getPendingTransactions = () => {
    const pendingTx = this.props.txStore.transactions.filter((tx: Transaction | WithdrawBalanceTransaction) =>
      tx.status === TRANSACTION_STATUS.pending &&
      tx instanceof WithdrawBalanceTransaction &&
      tx.address === this.props.account
    )
    return pendingTx.map((tx: WithdrawBalanceTransaction) => (
      <div key={tx.hash} style={{ marginTop: 10 }}>
        <Alert message={<small>Withdraw Balance transaction pending (<EtherscanLink hash={tx.hash} />)</small>}
               type="info" showIcon iconType="loading" style={{ display: 'inline-block' }} />
      </div>
    ))
  }

  render () {
    const pendingTransactions = this.getPendingTransactions()
    return (
      <div>
        <Button
          type="primary"
          size="default"
          onClick={this.confirm}
          disabled={!this.props.balance}>
          Withdraw
        </Button>
        {
          pendingTransactions.length > 0 &&
          <div style={{ marginTop: 20 }}>{pendingTransactions}</div>
        }
      </div>
    )
  }
}

AccountBalanceWithdraw = withTransactions(AccountBalanceWithdraw)
export { AccountBalanceWithdraw }
