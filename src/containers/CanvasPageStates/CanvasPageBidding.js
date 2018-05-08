import React, { Component } from 'react'
import { Col, Row } from 'antd'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarBidding from '../../components/CanvasSidebar/CanvasSidebarBidding'
import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import HighestBidWatcher from '../../hoc/renderProps/HighestBidWatcher'
import { LocalStorageManager } from '../../localStorage'
import { TransactionsHistory } from '../../components/CanvasHistory/TransactionsHistory'

class CanvasPageBidding extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
    }
  }

  componentDidMount () {
    this.getCanvas()
  }

  getCanvas = () => {
    // Get cached canvas pixels from Local Storage, but only when cache doesn't have expiration date,
    // which means it was cached when already finished (with all pixels)
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

          {this.state.isLoading && <p>Canvas loading...</p>}

          <CanvasStage
            canvasId={this.props.canvasId}
            pixelSize={this.props.pixelSize}
            pixels={this.state.pixels}
          />

          <HighestBidWatcher
            canvasId={this.props.canvasId}
            onBiddingFinished={this.props.onBiddingFinished}
            render={(state) =>
              <CanvasSidebarBidding {...state}
                                    canvasId={this.props.canvasId}
                                    isCanvasLoading={this.state.isLoading}
              />
            }
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

CanvasPageBidding.propTypes = {}
CanvasPageBidding.defaultProps = {}

export default withEvents(withWeb3(CanvasPageBidding))
