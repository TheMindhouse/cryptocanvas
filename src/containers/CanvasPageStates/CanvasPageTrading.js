import React, { Component } from 'react'
import { Col, Row } from 'antd'
import withWeb3 from '../../hoc/withWeb3'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarTrading from '../../components/CanvasSidebar/CanvasSidebarTrading'
import { LocalStorageManager } from '../../localStorage'
import { TransactionsHistory } from '../../components/CanvasHistory/TransactionsHistory'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'

class CanvasPageTrading extends Component {
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
        <Row className="CanvasPage" type="flex" justify="space-between" align="top">

          {this.state.isLoading && <CanvasStagePlaceholder />}

          <CanvasStage
            canvasId={this.props.canvasId}
            pixelSize={this.props.pixelSize}
            pixels={this.state.pixels}
          />

          <CanvasSidebarTrading
            canvasId={this.props.canvasId}
            canvasOwner={this.props.canvasOwner}
            isUserCanvasOwner={this.props.account === this.props.canvasOwner}
            onCanvasSold={this.props.onCanvasSold}
            isCanvasLoading={this.state.isLoading}
          />
        </Row>
        <Row className="container">
          <Col xs={{ span: 24, offset: 0}} sm={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }}>
            <TransactionsHistory canvasId={this.props.canvasId} />
          </Col>
        </Row>
      </div>
    )
  }
}

CanvasPageTrading.propTypes = {}
CanvasPageTrading.defaultProps = {}

export default withWeb3(CanvasPageTrading)
