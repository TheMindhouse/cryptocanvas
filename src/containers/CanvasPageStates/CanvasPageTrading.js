import React, { Component } from 'react'
import { Row } from 'antd'
import withWeb3 from '../../hoc/withWeb3'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarTrading from '../../components/CanvasSidebar/CanvasSidebarTrading'
import { LocalStorageManager } from '../../localStorage'

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
      <Row className="CanvasPage" type="flex" justify="space-around" align="top">

        {this.state.isLoading && <p>Canvas loading...</p>}

        <CanvasStage
          canvasId={this.props.canvasId}
          pixelSize={this.props.pixelSize}
          pixels={this.state.pixels}
        />

        <div>
          <CanvasSidebarTrading
            canvasId={this.props.canvasId}
            canvasOwner={this.props.canvasOwner}
            isUserCanvasOwner={this.props.account === this.props.canvasOwner}
            onCanvasSold={this.props.onCanvasSold}
          />
        </div>
      </Row>
    )
  }
}

CanvasPageTrading.propTypes = {}
CanvasPageTrading.defaultProps = {}

export default withWeb3(CanvasPageTrading)
