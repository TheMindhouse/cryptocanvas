// @flow
import React from 'react'
import { message } from 'antd'
import { ContractModel } from '../../models/ContractModel'
import { PainterReward } from '../../models/PainterReward'
import { Bid } from '../../models/Bid'
import { LocalStorageManager } from '../../localStorage'
import withWeb3 from '../withWeb3'

type PainterRewardCoreState = {
  painterReward: PainterReward,
  lastBid: Bid,
  onWithdraw: () => void,
}

type Props = {
  canvasId: number,
  render: PainterRewardCoreState => any,
  // from withWeb3
  Contract: ContractModel,
  account: string,
  web3: Object,
}

class PainterRewardCore extends React.Component<Props, PainterRewardCoreState> {
  constructor () {
    super()
    this.state = {
      painterReward: {},
      lastBid: null,
      onWithdraw: this.onWithdraw,
    }
  }

  componentDidMount () {
    this.getLastBid()
      .then(() => this.getRewardInfo())
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.account !== this.props.account) {
      this.getRewardInfo()
    }
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
    // console.log('[USER] Add painter reward to Account Balance requested');
    this.props.Contract.addRewardToAccountBalance(this.props.canvasId)
      .then(tx => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Add Reward to Account Balance Transaction sent')
      })
  }

  render() {
    return this.props.render(this.state)
  }
}

export default withWeb3(PainterRewardCore)