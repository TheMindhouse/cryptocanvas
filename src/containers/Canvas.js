import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

import { ABI } from '../helpers/ABI'
import canvasBg from '../assets/images/bg.png'
import CanvasPixel from '../components/CanvasPixel'
import withWeb3 from '../hoc/withWeb3'

const convertColorToRGB = (color) => {
  const red = Math.round(((color & 0xE0) >>> 5) / 7.0 * 255.0)
  const green = Math.round(((color & 0x1C) >>> 2) / 7.0 * 255.0)
  const blue = Math.round((color & 0x03) / 3.0 * 255.0)

  return `rgb(${red}, ${green}, ${blue})`
}

class Canvas extends React.Component {
  pixelSize = 14
  canvasId = 0

  constructor () {
    super()
    this.state = {
      pixels: [],
      isLoading: true,
    }
  }

  componentDidMount () {
    this.watchForChanges()

    this.props.Contract.getArtwork(0, { gas: 3000000 }, (error, result) => {
      if (!error) {
        const pixelsRGB = result.map(color => convertColorToRGB(color))
        this.setState({
          pixels: pixelsRGB,
          isLoading: false,
        })
      }
      else {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  handlePixelClick = ({ index, x, y }) => {
    const color = Math.floor(Math.random() * Math.floor(256))
    console.log(`User set pixel color at (${x}, ${y}) to ${color}`)

    // this.updatePixel({ index, color })
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

  render () {
    const gridCols = Math.sqrt(this.state.pixels.length)
    const canvasSize = gridCols * this.pixelSize
    return (
      <div>
        <h2>Canvas</h2>
        {this.state.isLoading && <p>Canvas loading...</p>}
        <Stage width={canvasSize} height={canvasSize}
               style={{ 'background': `url(${canvasBg})`, 'backgroundSize': this.pixelSize, 'width': canvasSize }}>
          <Layer>
            {
              this.state.pixels.map((color, index) =>
                <CanvasPixel
                  color={color}
                  index={index}
                  pixelSize={this.pixelSize}
                  gridCols={gridCols}
                  handlePixelClick={this.handlePixelClick}
                  key={index}
                />
              )
            }

          </Layer>
        </Stage>
      </div>
    )
  }
}

export default withWeb3(Canvas)
