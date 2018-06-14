// @flow
import React from 'react'
import { Alert, Button, Modal } from 'antd'
import withTransactions from '../../../hoc/withTransactions'
import { Transaction, TRANSACTION_TYPE } from '../../../models/Transaction'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'

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
      content: (
        <div>
          <p>Your reward for painting, <b>{this.props.rewardInEth} ETH</b>, will be added to your Account Balance.</p>
          <p>You can withdraw your Balance on My Account page.</p>
        </div>
      ),
      okText: 'Continue',
      okType: 'primary',
      width: 500,
      onOk: this.props.onWithdraw,
    })
  }

  render () {
    return (
      <div>
        <p>
          You've painted <b>{this.props.paintedPixels}</b> pixels of this Canvas <span className="emoji-rocket" />
          <span className="emoji-hands" />
        </p>
        {
          this.props.rewardInEth > 0 &&
          <p>
            You have <span title={this.props.rewardInEth + ' ETH'}>
              <b>{parseFloat(Number(this.props.rewardInEth).toFixed(5))} ETH</b>
            </span> waiting for you to withdraw!
          </p>
        }

        {
          this.props.isWithdrawn
            ? <Alert message="All rewards for painting have been added to your Account Balance" type="success" showIcon />
            : <Button
              type="primary"
              size="default"
              onClick={this.confirm}>
              Add to my Account Balance
            </Button>
        }

        <PendingTransactionInfo type={TRANSACTION_TYPE.addRewardToBalance} />

      </div>
    )
  }
}

export default withTransactions(WithReward)
