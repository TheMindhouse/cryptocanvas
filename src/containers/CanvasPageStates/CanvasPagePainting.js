import React from 'react'
import { Row, Modal } from 'antd'

import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import { Picker } from '../../components/Picker/Picker'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarPainting from '../../components/CanvasSidebar/CanvasSidebarPainting'
import { PixelPainted } from '../../models/PixelPainted'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import ConfirmPixelModal from '../../components/Modals/ConfirmPixelModal'
import { getNumberOfPaintedPixels } from '../../helpers/colors'
import { LocalStorageManager } from '../../localStorage'

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
    console.log(`Change current color to #${colorId}`)
    this.setState({
      activeColorId: colorId,
    })
  }

  changePixelColor = ({ id, x, y }) => {
    const color = this.state.activeColorId

    Modal.confirm({
      title: 'Do you want to paint this pixel?',
      content: <ConfirmPixelModal x={x} y={y} color={color} />,
      okText: 'Paint Pixel',
      okType: 'primary',
      onOk: () => {
        console.log(`User set pixel color at (${x}, ${y}) to ${color}`)
        this.props.Contract.setPixel({ canvasId: this.props.canvasId, index: id, color })
          .then((tx) => {
            LocalStorageManager.transactions.updateTransactions(tx)
            // this.updatePixel({ index, color })
            // Modal.success({
            //   title: 'Paint Pixel Transaction sent',
            //   content: 'Feel free to paint more! If the pixels you painted remain the same until the canvas is completed, ' +
            //   'you will be rewarded approximate amount of money from the initial bid.',
            // })
          })
          .catch((error) => {
            Modal.error({
              title: 'Could not update pixel',
              content: 'Make sure your address is able to paint the pixel again',
            })
          })
      },
      onCancel: () => {
        console.log('Pixel update cancelled')
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
    console.log('--> Checking if painting has finished: ' + hasFinished)
    if (hasFinished) {
      console.log('[EVENT] - All the pixels have been painted!')
      this.props.onPaintingFinished()
    }
  }

  watchForChanges = (blockNumber) => {
    const pixelPaintedEvent = this.props.Contract.PixelPaintedEvent({ _canvasId: this.props.canvasId }, {
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

    this.props.events.push(pixelPaintedEvent)
  }

  render () {
    return (
      <Row className="CanvasPage" type="flex" justify="space-around" align="top">

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
          currentColor={this.props.account ? this.state.currentColorIndex : undefined}
          isPickerDisabled={!this.props.account}
        />
      </Row>
    )
  }
}

export default withEvents(withWeb3(CanvasPagePainting))
