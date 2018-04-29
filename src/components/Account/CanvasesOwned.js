// @flow
import * as React from 'react'
import { ContractModel } from '../../models/ContractModel'
import withWeb3 from '../../hoc/withWeb3'
import { CANVAS_STATES } from '../../models/CanvasState'
import { CanvasInfo } from '../../models/CanvasInfo'
import { Col, Row } from 'antd'
import CanvasPreview from '../Homepage/CanvasPreview'
import Spin from 'antd/es/spin/index'

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  Contract: ContractModel,
  account: string,
}

type State = {
  ownedCanvasesIds: Array<number>,
  isLoading: boolean,
}

class CanvasesOwned extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    ownedCanvasesIds: [],
    isLoading: true,
  }

  componentDidMount () {
    this.getCanvasesOwned()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      this.setState({ isLoading: true }, this.getCanvasesOwned)
    }
  }

  getCanvasesOwned = () => {
    if (!this.props.accountAddress) {
      return
    }
    this.props.Contract.getCanvasIdsByState(CANVAS_STATES.completed)
      .then(finishedCanvases => {
        const pCanvasesInfo = finishedCanvases.map(canvasId => this.props.Contract.getCanvasInfo(canvasId))
        Promise.all(pCanvasesInfo).then((canvasesInfo: Array<CanvasInfo>) => {
          const ownedCanvasesIds = canvasesInfo
            .filter(canvasInfo => canvasInfo.owner === this.props.accountAddress)
            .map(canvasInfo => canvasInfo.id)
          this.setState({ ownedCanvasesIds, isLoading: false })
        })
      })
  }

  render () {
    if (this.state.isLoading) {
      return <Spin />
    }

    return (
      <div>
        <h3>
          {
            this.props.accountAddress === this.props.account
              ? 'You are the owner of '
              : 'User with this address is the owner of '
          }
          <b>{this.state.ownedCanvasesIds.length}</b> {this.state.ownedCanvasesIds.length !== 1 ? 'canvases' : 'canvas'}.
        </h3>
        <br />
        <Row gutter={100} type="flex" style={{ marginBottom: -60 }}>
          {this.state.ownedCanvasesIds.map((canvasId, index) =>
            <Col span={6} key={index}>
              <CanvasPreview canvasId={canvasId} />
            </Col>
          )}
        </Row>
      </div>
    )
  }
}

export default withWeb3(CanvasesOwned)
