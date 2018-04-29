import React from 'react'
import { Alert, Button, Modal } from 'antd'

const WithReward = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Add Reward to Account Balance?',
      content: <span>Your reward for painting, <b>{props.rewardInEth} ETH</b>, will be added to your
        Account Balance. You can withdraw your Balance on My Account page.</span>,
      okText: 'Continue',
      okType: 'primary',
      width: 500,
      onOk: props.onWithdraw,
    })
  }

  return (
    <div>
      <p>
        You've painted <b>{props.paintedPixels}</b> final pixels of this Canvas <span className="emoji-rocket" /> <span
        className="emoji-hands" />
      </p>
      <p>
        Your reward for painting is <span title={props.rewardInEth + ' ETH'}>
            <b>{parseFloat(Number(props.rewardInEth).toFixed(5))} ETH</b>
          </span>.
      </p>

      {
        props.isWithdrawn
          ? <Alert message="Reward for painting has been added to your Account Balance 🎉" type="success" showIcon />
          : <Button
            type="primary"
            size="default"
            onClick={confirm}
            title={props.isWithdrawn ? 'You have already added the reward to your Account Balance.' : ''}>
            Add to my Account Balance
          </Button>
      }


    </div>
  )
}

WithReward.propTypes = {}
WithReward.defaultProps = {}

export default WithReward
