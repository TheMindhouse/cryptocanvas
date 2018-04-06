import React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import WithdrawButton from './PainterReward/WithdrawButton'
import { updateTransactions } from '../../helpers/localStorage'
import { Modal } from 'antd'

class WithdrawReward extends React.Component {
  state = {
    painterReward: {}
  }

  componentDidMount () {
    this.getRewardInfo()
    this.watchForChanges()
  }

  getRewardInfo = () => {
    this.props.Contract.getRewardInfo(this.props.canvasId, this.props.userAddress)
      .then(painterReward => {
        console.log(painterReward)
        this.setState({ painterReward })
      })
  }

  onWithdraw = () => {
    console.log('[USER] Painter reward withdraw requested');
    this.props.Contract.withdrawReward(this.props.canvasId)
      .then(tx => {
        updateTransactions(tx)
        Modal.success({
          title: 'Withdraw Reward Transaction sent',
          content: 'You should see the reward on your account after a few minutes, when the blockchain updates.',
        })
      })
  }

  watchForChanges = () => {

  }

  render() {
    const {
      paintedPixels,
      rewardValue,
      isWithdrawn,
    } = this.state.painterReward

    const rewardInEth = this.props.web3.fromWei(rewardValue)

    return (
      <div>
        <h2>Co-Painter Reward</h2>

        <p>You have painted <b>{paintedPixels}</b> pixels of this Canvas.</p>
        <p>
          Your reward for painting is <span title={rewardInEth + ' ETH'}>
            <b>{parseFloat(Number(rewardInEth).toFixed(5))}</b>
          </span> ETH.
        </p>

        {
          rewardValue > 0 &&
          <WithdrawButton
            amount={rewardInEth}
            address={this.props.userAddress}
            onWithdraw={this.onWithdraw}
            isWithdrawn={isWithdrawn}
          />
        }

      </div>
    );
  }
}

WithdrawReward.propTypes = {}
WithdrawReward.defaultProps = {}

export default withWeb3(WithdrawReward)