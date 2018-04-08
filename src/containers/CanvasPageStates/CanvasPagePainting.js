import React from 'react'
import { Row, Modal } from 'antd'

import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import { Picker } from '../../components/Picker/Picker'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebar from '../../components/CanvasSidebar/CanvasSidebar'
import { PixelPainted } from '../../models/PixelPainted'
import CanvasStagePlaceholder from '../../components/Canvas/CanvasStagePlaceholder'
import ConfirmPixelModal from '../../components/Modals/ConfirmPixelModal'
import { getNumberOfPaintedPixels } from '../../helpers/colors'
import { updateTransactions } from '../../helpers/localStorage'

class CanvasPagePainting extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
      currentColorHex: null,
      currentColorIndex: null,
      hovering: null,
    }
  }

  componentDidMount () {
    this.getCanvas()

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  getCanvas = () => {
    // Temporary store canvas in local storage
    const tempCanvas = window.localStorage.getItem('tempCanvas2')

    if (tempCanvas) {
      this.setState({
        pixels: JSON.parse(tempCanvas),
        isLoading: false,
      })
      return
    }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        window.localStorage.setItem('tempCanvas', JSON.stringify(pixels))
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      })
  }

  changeColor = ({ color, index }) => {
    console.log(`Change current color to (${color}, ${index})`)
    this.setState({
      currentColorHex: color,
      currentColorIndex: index,
    })
  }

  handlePixelClick = ({ index, x, y }) => {
    const color = this.state.currentColorIndex

    Modal.confirm({
      title: 'Do you want to paint this pixel?',
      content: <ConfirmPixelModal x={x} y={y} color={color} />,
      okText: 'Yes, paint pixel',
      okType: 'primary',
      onOk: () => {
        console.log(`User set pixel color at (${x}, ${y}) to ${color}`)
        this.props.Contract.setPixel({ canvasId: this.props.canvasId, index, color })
          .then((tx) => {
            updateTransactions(tx)
            // this.updatePixel({ index, color })
            Modal.success({
              title: 'Paint Pixel Transaction sent',
              content: 'Feel free to paint more! If the pixels you painted remain the same until the canvas is completed, ' +
              'you will be rewarded approximate amount of money from the initial bid.',
            })
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
    const pixelPaintedEvent = this.props.Contract.PixelPaintedEvent({ _canvasId: this.props.canvasId }, { fromBlock: blockNumber, toBlock: 'latest' })

    // watch for changes
    pixelPaintedEvent.watch((error, result) => {
      const pixelPainted = new PixelPainted(result.args)
      const { index, color } = pixelPainted
      console.log(`[EVENT] Updated pixel color at (${index}) to ${color}`)
      this.updatePixel({ index, color })
      if (!error)
        console.log(result)
    })

    this.props.events.push(pixelPaintedEvent)
  }

  render () {
    return (
      <Row className="CanvasPage" type="flex" justify="space-around" align="top">

        {this.state.isLoading && <CanvasStagePlaceholder />}

        {!this.state.isLoading &&
        <CanvasStage
          pixelSize={this.props.pixelSize}
          pixels={this.state.pixels}
          currentColorHex={this.state.currentColorHex}
          changePixelColor={this.handlePixelClick}
        />
        }

        <div>
          <CanvasSidebar
            canvasId={this.props.canvasId}
            paintedPixels={getNumberOfPaintedPixels(this.state.pixels)}
            totalPixels={this.state.pixels.length}
          />
          <Picker
            changeColor={this.changeColor}
            currentColor={this.props.account ? this.state.currentColorIndex : undefined}
            isDisabled={!this.props.account}
          />
          <br />
          <p>How can I place a pixel?</p>
        </div>
      </Row>
    )
  }
}

export default withEvents(withWeb3(CanvasPagePainting))
