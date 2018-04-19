import React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { Modal } from 'antd'
import WithReward from './PainterReward/WithReward'
import WithoutReward from './PainterReward/WithoutReward'
import { LocalStorageManager } from '../../localStorage'

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
    console.log('[USER] Add painter reward to Account Balance requested');
    this.props.Contract.addRewardToAccountBalance(this.props.canvasId)
      .then(tx => {
        LocalStorageManager.transactions.updateTransactions(tx)
        Modal.success({
          title: 'Add Reward to Account Balance Transaction sent',
          content: 'You should be able to withdraw the reward from your Account Balance after a few minutes, when the blockchain updates.',
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
        <h2><b>Co-Painter Reward</b></h2>

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