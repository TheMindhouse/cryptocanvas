import React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { updateTransactions } from '../../helpers/localStorage'
import { Modal } from 'antd'
import WithReward from './PainterReward/WithReward'
import WithoutReward from './PainterReward/WithoutReward'

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

    return (
      <div>
        <h2>Co-Painter Reward</h2>

        {
          paintedPixels ?
            <WithReward
              paintedPixels={paintedPixels}
              rewardInEth={this.props.web3.fromWei(rewardValue)}
              isWithdrawn={isWithdrawn}
              userAddress={this.props.userAddress}
              onWithdraw={this.onWithdraw}
            />
            : <WithoutReward />
        }

      </div>
    );
  }
}

WithdrawReward.propTypes = {}
WithdrawReward.defaultProps = {}

export default withWeb3(WithdrawReward)