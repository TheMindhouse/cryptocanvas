// @flow
import React from 'react'
import withWeb3 from '../../../hoc/withWeb3'
import { message } from 'antd'
import WithReward from './WithReward'
import WithoutReward from './WithoutReward'
import { LocalStorageManager } from '../../../localStorage/index'
import { Bid } from '../../../models/Bid'
import { PainterReward } from '../../../models/PainterReward'
import { ContractModel } from '../../../models/ContractModel'

type Props = {
  canvasId: number,
  // from withWeb3
  Contract: ContractModel,
  account: string,
  web3: Object,
}

type State = {
  painterReward: PainterReward,
  lastBid: Bid,
}

class WithdrawReward extends React.Component<Props, State> {
  state = {
    painterReward: {},
    lastBid: null,
  }

  componentDidMount () {
    this.getLastBid()
      .then(() => this.getRewardInfo())
  }

  getLastBid = () => {
    return this.props.Contract.getLastBid(this.props.canvasId)
      .then((lastBid: Bid) => this.setState({ lastBid }))
  }

  getRewardInfo = () => {
    this.props.Contract.getRewardInfo(this.props.canvasId, this.props.account)
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
        message.success('Add Reward to Account Balance Transaction sent')
      })
  }

  render() {
    const {
      paintedPixels,
      rewardValue,
      isWithdrawn,
    } = this.state.painterReward

    return (
      <div>
        <h2><b>Painter Reward</b></h2>
        {
          this.state.lastBid &&
          <p>Canvas was sold during Initial Bidding for <b>{this.props.web3.fromWei(this.state.lastBid.amount)} ETH</b>.</p>
        }
        {
          paintedPixels ?
            <WithReward
              paintedPixels={paintedPixels}
              rewardInEth={this.props.web3.fromWei(rewardValue)}
              isWithdrawn={isWithdrawn}
              userAddress={this.props.account}
              onWithdraw={this.onWithdraw}
            />
            : <WithoutReward />
        }

      </div>
    );
  }
}

export default withWeb3(WithdrawReward)