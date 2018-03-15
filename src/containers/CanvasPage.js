import React from 'react'

import withWeb3 from '../hoc/withWeb3'
import { Picker } from '../components/Picker/Picker'
import { convertColorToRGB } from '../helpers/colors'
import CanvasStage from '../components/Canvas/CanvasStage'

class CanvasPage extends React.Component {
  pixelSize = 10
  canvasId = 0

  constructor () {
    super()
    this.state = {
      pixels: [],
      isLoading: true,
      currentColorHex: null,
      currentColorIndex: null,
      hovering: null,
    }
  }

  componentDidMount () {
    this.watchForChanges()

    // Temporary store canvas in local storage
    const tempCanvas = window.localStorage.getItem('tempCanvas')

    if (tempCanvas) {
      this.setState({
        pixels: JSON.parse(tempCanvas),
        isLoading: false,
      })
      return
    }

    this.props.Contract.getArtwork(0, { gas: 3000000 }, (error, result) => {
      if (!error) {
        const pixelsRGB = result.map(color => convertColorToRGB(color))
                                .map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`)
        this.setState({
          pixels: pixelsRGB,
          isLoading: false,
        })

        window.localStorage.setItem('tempCanvas', JSON.stringify(pixelsRGB))
      }
      else {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  changeColor = ({ color, index }) => {
    console.log(`Change current color to (${color}, ${index})`);
    this.setState({
      currentColorHex: color,
      currentColorIndex: index,
    })
  }

  handlePixelClick = ({ index, x, y }) => {
    const color = Math.floor(Math.random() * Math.floor(256))
    console.log(`User set pixel color at (${x}, ${y}) to ${color}`)

    this.updatePixel({ index, color })
    this.props.Contract.setPixel(this.canvasId, index, color)
  }

  updatePixel = ({ index, color }) => {
    const updatedPixels = [
      ...this.state.pixels.slice(0, index),
      convertColorToRGB(color),
      ...this.state.pixels.slice(index + 1, this.state.pixels.length)
    ]

    this.setState({ pixels: updatedPixels })
  }

  watchForChanges = () => {
    const { blockNumber } = this.props.web3.eth
    const pixelPaintedEvent = this.props.Contract.PixelPainted({}, { fromBlock: blockNumber, toBlock: 'latest' })

    // watch for changes
    pixelPaintedEvent.watch((error, result) => {
      const index = parseInt(result.args.index, 10)
      const color = parseInt(result.args.color, 10)

      console.log(`[EVENT] Updated pixel color at (${index}) to ${color}`)
      this.updatePixel({ index, color })
      if (!error)
        console.log(result)
    })
  }

  onMouseOver = (evt) => {
    if (!this.state.currentColorIndex) {
      return
    }
    console.log(evt);

    var box = evt.target
    this.refs.layer2.clear()
    this.refs.highlight.x(box.x())
    this.refs.highlight.y(box.y())
    this.refs.highlight.show()

    const stage = this.refs.canvas.getStage()
    const mousePos = stage.getPointerPosition()
    this.refs.highlightColor.x((mousePos.x / stage.scaleX()) - (this.pixelSize - 2) / 2)
    this.refs.highlightColor.y((mousePos.y / stage.scaleY()) - (this.pixelSize - 2) / 2)
    this.refs.highlightColor.show()
    this.refs.layer2.draw()
  }

  onMouseOut = (evt) => {
    console.log(evt);

    this.refs.highlight.hide()
    this.refs.layer2.draw()
  }

  onMouseMove = (evt) => {
    console.log(evt);
    const stage = this.refs.canvas.getStage()
    const mousePos = stage.getPointerPosition()
    this.refs.highlightColor.x((mousePos.x / stage.scaleX()) - (this.pixelSize - 2) / 2)
    this.refs.highlightColor.y((mousePos.y / stage.scaleY()) - (this.pixelSize - 2) / 2)
    this.refs.layer2.draw()
  }

  render () {

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {this.state.isLoading && <p>Canvas loading...</p>}

        <CanvasStage
          pixelSize={this.pixelSize}
          pixels={this.state.pixels}
          currentColorHex={this.state.currentColorHex}
        />

        <Picker
          changeColor={this.changeColor}
          currentColor={this.state.currentColorIndex}
        />
      </div>
    )
  }
}

export default withWeb3(CanvasPage)
