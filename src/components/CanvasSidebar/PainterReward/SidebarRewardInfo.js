// @flow
import React from 'react'
import WithReward from './WithReward'
import WithoutReward from './WithoutReward'
import { Bid } from '../../../models/Bid'
import { PainterReward } from '../../../models/PainterReward'
import { ethConverter } from '../../../helpers/ethConverter'

type Props = {
  painterReward: PainterReward,
  lastBid: Bid,
  onWithdraw: () => void,
  canvasId: number,
}

class SidebarRewardInfo extends React.Component<Props> {
  render() {
    const {
      paintedPixels,
      rewardValue,
      isWithdrawn,
    } = this.props.painterReward

    return (
      <div>
        <h2><b>Painter Reward</b></h2>
        {
          this.props.lastBid &&
          <p>Canvas was sold during Initial Bidding for <b>{ethConverter.wei2eth(this.props.lastBid.amount)} ETH</b>.</p>
        }
        {
          paintedPixels ?
            <WithReward
              paintedPixels={paintedPixels}
              rewardInEth={ethConverter.wei2eth(rewardValue)}
              isWithdrawn={isWithdrawn}
              onWithdraw={this.props.onWithdraw}
              canvasId={this.props.canvasId}
            />
            : <WithoutReward />
        }

      </div>
    );
  }
}

export default SidebarRewardInfo