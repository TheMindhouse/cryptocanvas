// @flow
import React from 'react'
import { Alert, Button, Modal, Spin } from 'antd'
import withTransactions from '../../../hoc/withTransactions'
import { Transaction, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../../models/Transaction'
import { EtherscanLink } from '../../Small/EtherscanLink'
import { TransactionWithCanvasId } from '../../../models/transactions/TransactionWithCanvasId'

type Props = {
  rewardInEth: number,
  onWithdraw: () => void,
  account: string,
  paintedPixels: number,
  isWithdrawn: boolean,
  canvasId: number,
  // withTransactions
  txStore: {
    transactions: Array<Transaction>
  },
}

class WithReward extends React.PureComponent<Props> {
  confirm = () => {
    Modal.confirm({
      title: 'Add Reward to Account Balance?',
      content: <span>Your reward for painting, <b>{this.props.rewardInEth} ETH</b>, will be added to your
        Account Balance. You can withdraw your Balance on My Account page.</span>,
      okText: 'Continue',
      okType: 'primary',
      width: 500,
      onOk: this.props.onWithdraw,
    })
  }

  getPendingTransactions = () => {
    const pendingTx = this.props.txStore.transactions.filter((tx: Transaction | TransactionWithCanvasId) =>
      tx.status === TRANSACTION_STATUS.pending &&
      tx.type === TRANSACTION_TYPE.addRewardToBalance &&
      tx.account === this.props.account &&
      tx.canvasId === this.props.canvasId
    )
    return pendingTx.map((tx: TransactionWithCanvasId) => (
      <div key={tx.hash} style={{ marginTop: 10 }}>
        <Alert message={<small>Add Reward To Balance transaction pending (<EtherscanLink hash={tx.hash} />)</small>}
               type="info" showIcon iconType="loading"/>
      </div>
    ))
  }

  render () {
    const pendingTransactions = this.getPendingTransactions()
    return (
      <div>
        <p>
          You've painted <b>{this.props.paintedPixels}</b> final pixels of this Canvas <span className="emoji-rocket" />
          <span
            className="emoji-hands" />
        </p>
        <p>
          Your reward for painting is <span title={this.props.rewardInEth + ' ETH'}>
            <b>{parseFloat(Number(this.props.rewardInEth).toFixed(5))} ETH</b>
          </span>.
        </p>

        {
          this.props.isWithdrawn
            ? <Alert message="Reward for painting has been added to your Account Balance 🎉" type="success" showIcon />
            : <Button
              type="primary"
              size="default"
              onClick={this.confirm}>
              Add to my Account Balance
            </Button>
        }

        {
          pendingTransactions.length > 0 &&
          <div style={{ marginTop: 20 }}>{pendingTransactions}</div>
        }

      </div>
    )
  }
}

export default withTransactions(WithReward)
