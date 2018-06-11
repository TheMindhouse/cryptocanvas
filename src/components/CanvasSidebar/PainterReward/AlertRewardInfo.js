// @flow
import * as React from 'react'
import { PainterReward } from '../../../models/PainterReward'
import { Bid } from '../../../models/Bid'
import { Alert, Button, Row } from 'antd'
import { CONFIG } from '../../../config'
import { Modal } from 'antd/lib/index'
import { ethConverter } from '../../../helpers/ethConverter'

type Props = {
  painterReward: PainterReward,
  lastBid: Bid,
  onWithdraw: () => void,
  canvasId: number,
}

class AlertRewardInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  confirm = () => {
    Modal.confirm({
      title: 'Add Reward to Account Balance?',
      content: (
        <div>
          <p>
            Your reward for painting, <b>{ethConverter.wei2eth(this.props.painterReward.rewardValue)} ETH</b>,
            will be added to your Account Balance.
          </p>
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
    const {
      paintedPixels,
      rewardValue,
      isWithdrawn,
    } = this.props.painterReward

    if (!paintedPixels || isWithdrawn) {
      return null
    }

    const percentOwned = parseFloat(parseFloat(paintedPixels / Math.pow(CONFIG.gridColumns, 2) * 100).toFixed(2))

    return (
      <div className="container">
        <Alert
          message={
            <Row type="flex" align="middle">
              <div className="text-center" style={{ marginRight: 20 }}>
                <h2 style={{ margin: 0 }}>
                  <b>{ethConverter.wei2eth(this.props.painterReward.rewardValue)} ETH</b>
                </h2>
                <span className="text-smaller">
                  Your current Reward
                </span>
              </div>
              <div>
                <h3><b>Withdraw Reward for Painting</b></h3>
                <p>
                  You've painted <b>{paintedPixels}</b> pixels of
                  Canvas #{this.props.canvasId} <span className="emoji-rocket" />.
                  You'll receive <b>{percentOwned}%</b> of Painters Reward every time this Canvas is sold.
                </p>
                <Button
                  type="primary"
                  size="default"
                  onClick={this.confirm}>
                  Add to my Account Balance
                </Button>
              </div>
            </Row>
          }
          type="success"
          closable
          style={{ marginBottom: 30, padding: 15 }}
        />
      </div>
    )
  }
}

export { AlertRewardInfo }
