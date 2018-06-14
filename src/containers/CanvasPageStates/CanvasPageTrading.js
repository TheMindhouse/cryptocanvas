// @flow
import React, { Component } from 'react'
import { Col, Row } from 'antd'
import withWeb3 from '../../hoc/withWeb3'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarTrading from '../../components/CanvasSidebar/CanvasSidebarTrading'
import { LocalStorageManager } from '../../localStorage'
import { TransactionsHistory } from '../../components/CanvasHistory/TransactionsHistory'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import { ContractModel } from '../../models/ContractModel'
import { CanvasInfo } from '../../models/CanvasInfo'
import PainterRewardCore from '../../hoc/renderProps/PainterRewardCore'
import { AlertRewardInfo } from '../../components/CanvasSidebar/PainterReward/AlertRewardInfo'

type Props = {
  canvasId: number,
  canvasInfo: CanvasInfo,
  pixelSize: number,
  onCanvasSold: () => void,
  // withWeb3
  Contract: ContractModel,
  account: string,
}

type State = {
  pixels: Array<number>,
  isLoading: boolean,
}

class CanvasPageTrading extends Component<Props, State> {
  state = {
    pixels: [],
    isLoading: true,
  }

  componentDidMount () {
    this.getCanvas()
  }

  getCanvas = () => {
    // Get cached canvas pixels from Local Storage
    const canvasCache = LocalStorageManager.canvasPixels.getCanvasCache(this.props.canvasId)
    if (canvasCache && !canvasCache.expirationDate) {
      return this.setState({
        pixels: canvasCache.pixelsMap,
        isLoading: false,
      })
    }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        // Update pixels cache in Local Storage
        LocalStorageManager.canvasPixels.updateCanvasCache({
          canvasId: this.props.canvasId,
          pixelsMap: pixels,
          withExpirationDate: false
        })
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  render () {
    return (
      <div>
        {
          this.props.account &&
          <PainterRewardCore
            canvasId={this.props.canvasId}
            render={(state) => <AlertRewardInfo {...state} canvasId={this.props.canvasId} />
            }
          />
        }

        <Row className="CanvasPage" type="flex" justify="space-between" align="top">

          {this.state.isLoading && <CanvasStagePlaceholder />}

          <CanvasStage
            canvasId={this.props.canvasId}
            pixelSize={this.props.pixelSize}
            pixels={this.state.pixels}
          />

          <CanvasSidebarTrading
            canvasId={this.props.canvasId}
            canvasInfo={this.props.canvasInfo}
            onCanvasSold={this.props.onCanvasSold}
            isCanvasLoading={this.state.isLoading}
          />
        </Row>
        <Row className="container">
          <Col xs={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }}>
            <TransactionsHistory canvasId={this.props.canvasId} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withWeb3(CanvasPageTrading)
