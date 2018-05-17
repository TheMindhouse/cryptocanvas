import React from 'react'
import { message, Modal, Row } from 'antd'

import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarPainting from '../../components/CanvasSidebar/CanvasSidebarPainting'
import { PixelPainted } from '../../models/PixelPainted'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import ConfirmPixelModal from '../../components/Modals/ConfirmPixelModal'
import { getNumberOfPaintedPixels } from '../../helpers/colors'
import { LocalStorageManager } from '../../localStorage'
import type { PixelIndex } from '../../types/PixelIndex'
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
    if (!this.props.account) { return }
    // console.log(`Change current color to #${colorId}`)
    this.setState({
      activeColorId: colorId,
    })
  }

  changePixelColor = (pixelIndex: PixelIndex) => {
    const colorId = this.state.activeColorId

    this.props.analyticsAPI.event({
      category: ANALYTICS_EVENTS.painting,
      action: ANALYTICS_ACTIONS.painting.paintPixelConfirm,
      label: `Canvas #${this.props.canvasId}, pixel (${pixelIndex.x}, ${pixelIndex.y})`,
    })

    Modal.confirm({
      title: 'Do you want to paint this pixel?',
      content: <ConfirmPixelModal x={pixelIndex.x} y={pixelIndex.y} color={colorId} />,
      okText: 'Paint Pixel',
      okType: 'primary',
      onOk: () => {
        this.props.analyticsAPI.event({
          category: ANALYTICS_EVENTS.painting,
          action: ANALYTICS_ACTIONS.painting.paintPixelSubmit,
          label: `Canvas #${this.props.canvasId}, pixel (${pixelIndex.x}, ${pixelIndex.y})`,
        })
        // console.log(`User set pixel color at (${pixelIndex.x}, ${pixelIndex.y}) to ${colorId}`)
        this.props.Contract.setPixel({ canvasId: this.props.canvasId, pixelIndex, colorId })
          .then((tx) => {
            LocalStorageManager.transactions.updateTransactions(tx)
            message.success('Paint Pixel Transaction sent')
          })
          .catch((error) => {
            Modal.error({
              title: 'Could not update pixel',
              content: 'Make sure your address is able to paint the pixel again',
            })
            this.props.analyticsAPI.event({
              category: ANALYTICS_EVENTS.painting,
              action: ANALYTICS_ACTIONS.painting.paintPixelFailed,
              label: `Canvas #${this.props.canvasId}, pixel (${pixelIndex.x}, ${pixelIndex.y})`,
            })
          })
      },
      onCancel: () => {
        // console.log('Pixel update cancelled')
      },
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
            changePixelColor={this.changePixelColor}
            changeActiveColor={this.changeActiveColor}
          />
        }

        <CanvasSidebarPainting
          canvasId={this.props.canvasId}
          paintedPixels={getNumberOfPaintedPixels(this.state.pixels)}
          totalPixels={this.state.pixels.length}
          changeActiveColor={this.changeActiveColor}
          activeColorId={this.props.account ? this.state.activeColorId : undefined}
          isPickerDisabled={!this.props.account}
          isCanvasLoading={this.state.isLoading}
        />
      </Row>
    )
  }
}

export default withAnalytics(withEvents(withWeb3(CanvasPagePainting)))
