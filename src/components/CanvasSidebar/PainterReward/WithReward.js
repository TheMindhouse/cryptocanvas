import React from 'react'
import { Button, Modal } from 'antd'

const WithReward = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm Reward Withdraw',
      content: <span>Do you want to withdraw <b>{props.rewardInEth} ETH</b> reward to address <b>{props.userAddress}</b>?</span>,
      okText: 'Withdraw',
      okType: 'primary',
      width: 500,
      onOk: props.onWithdraw,
    })
  }

  return (
    <div>
      <p>You have painted <b>{props.paintedPixels}</b> pixels of this Canvas.</p>
      <p>
        Your reward for painting is <span title={props.rewardInEth + ' ETH'}>
            <b>{parseFloat(Number(props.rewardInEth).toFixed(5))}</b>
          </span> ETH <span className="emoji-rocket" /> <span className="emoji-hands" />
      </p>

      <Button
        type="primary"
        size="default"
        onClick={confirm}
        title={props.isWithdrawn ? 'You have already withdrawn your reward.' : ''}
        disabled={props.isWithdrawn}>
        Withdraw
      </Button>
    </div>
  )
}

WithReward.propTypes = {}
WithReward.defaultProps = {}

export default WithReward
