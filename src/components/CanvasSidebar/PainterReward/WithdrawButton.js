import React from 'react'
import { Button, Modal } from 'antd'

const WithdrawButton = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm Reward Withdraw',
      content: <span>Do you want to withdraw <b>{props.amount} ETH</b> reward to address <b>{props.address}</b>?</span>,
      okText: 'Withdraw',
      okType: 'primary',
      width: 500,
      onOk: props.onWithdraw,
    })
  }

  return (
    <Button
      type="primary"
      size="default"
      onClick={confirm}
      title={props.isWithdrawn ? 'You have already withdrawn your reward.' : ''}
      disabled={props.isWithdrawn}>
      Withdraw
    </Button>
  )
}

WithdrawButton.propTypes = {}
WithdrawButton.defaultProps = {}

export default WithdrawButton
