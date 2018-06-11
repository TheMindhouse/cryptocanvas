import React from 'react'
import { Row } from 'antd'

import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarPainting from '../../components/CanvasSidebar/CanvasSidebarPainting'
import { PixelPainted } from '../../models/PixelPainted'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import { getNumberOfPaintedPixels } from '../../helpers/colors'
import { LocalStorageManager } from '../../localStorage'
import { withAnalytics } from '../../hoc/withAnalytics'
import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../../constants/analytics'

class CanvasPagePainting extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
      activeColorId: null,
    }
  }

  componentDidMount () {
    this.getCanvas()

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  getCanvas = () => {
    // In Painting state we never get Canvas from the Cache, we always want to have it fresh from the blockchain
    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        // Save it to storage for homepage Preview component
        this.updateLocalStorageCache(pixels)
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  updateLocalStorageCache = (pixels) => {
    // Update pixels cache in Local Storage
    LocalStorageManager.canvasPixels.updateCanvasCache({
      canvasId: this.props.canvasId,
      pixelsMap: pixels,
      withExpirationDate: true
    })
  }

  changeActiveColor = (colorId) => {
    // console.log(`Change current color to #${colorId}`)
    this.setState({
      activeColorId: colorId,
    })
    this.props.analyticsAPI.event({
      category: ANALYTICS_EVENTS.painting,
      action: ANALYTICS_ACTIONS.painting.colorSelected,
      value: colorId,
    })
  }

  updatePixel = ({ index, color }) => {
    const updatedPixels = [
      ...this.state.pixels.slice(0, index),
      color,
      ...this.state.pixels.slice(index + 1, this.state.pixels.length)
    ]

    this.setState({ pixels: updatedPixels }, this.checkIfFinishedPainting)
    this.updateLocalStorageCache(updatedPixels)
  }

  checkIfFinishedPainting = () => {
    const hasFinished = getNumberOfPaintedPixels(this.state.pixels) === this.state.pixels.length
    // console.log('--> Checking if painting has finished: ' + hasFinished)
    if (hasFinished) {
      console.log('[EVENT] - All the pixels have been painted!')
      this.props.onPaintingFinished()
    }
  }

  watchForChanges = (blockNumber) => {
    const pixelPaintedEvent = this.props.Contract.PixelPaintedEvent({ canvasId: this.props.canvasId }, {
      fromBlock: blockNumber,
      toBlock: 'latest'
    })

    // watch for changes
    pixelPaintedEvent.watch((error, result) => {
      const pixelPainted = new PixelPainted(result.args)
      const { index, color } = pixelPainted
      console.log(`[EVENT] Updated pixel color at (${index}) to ${color}`)
      this.updatePixel({ index, color })
    })

    this.props.addEvents(pixelPaintedEvent)
  }

  render () {
    return (
      <Row className="CanvasPage" type="flex" justify="space-between" align="top">

        {this.state.isLoading && <CanvasStagePlaceholder />}

        {
          !this.state.isLoading &&
          <CanvasStage
            canvasId={this.props.canvasId}
            pixelSize={this.props.pixelSize}
            pixels={this.state.pixels}
            activeColorId={this.state.activeColorId}
            changeActiveColor={this.changeActiveColor}
          />
        }

        <CanvasSidebarPainting
          canvasId={this.props.canvasId}
          paintedPixels={getNumberOfPaintedPixels(this.state.pixels)}
          totalPixels={this.state.pixels.length}
          changeActiveColor={this.changeActiveColor}
          activeColorId={this.state.activeColorId}
          isEthereumActive={this.props.account}
          isCanvasLoading={this.state.isLoading}
        />
      </Row>
    )
  }
}

export default withAnalytics(withEvents(withWeb3(CanvasPagePainting)))
