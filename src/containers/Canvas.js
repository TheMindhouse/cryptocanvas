import React from 'react'
import { Stage, Layer, Line} from 'react-konva'

import canvasBg from '../assets/images/bg.png'
import CanvasPixel from '../components/CanvasPixel'
import withWeb3 from '../hoc/withWeb3'

const convertColorToRGB = (color) => {
  const red = Math.round(((color & 0xE0) >>> 5) / 7.0 * 255.0)
  const green = Math.round(((color & 0x1C) >>> 2) / 7.0 * 255.0)
  const blue = Math.round((color & 0x03) / 3.0 * 255.0)

  return `rgb(${red}, ${green}, ${blue})`
}

const drawGrid = (pixelSize, canvasSize) => {
  let grid = []

  for (let i = 0; i <= (canvasSize / pixelSize); i++) {
    const position = i * pixelSize
    const length = canvasSize
    grid.push(<Line points={[position, 0, position, length]} stroke="#eee" strokeWidth="1" key={`v-${i}`} />)
    grid.push(<Line points={[0, position, length, position]} stroke="#eee" strokeWidth="1" key={`h-${i}`} />)
  }

  return grid
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
        <Stage
            width={canvasSize}
            height={canvasSize}
            style={{ 'background': `url(${canvasBg})`, 'backgroundSize': this.pixelSize, 'width': canvasSize }}
        >
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

          <Layer>
            { drawGrid(this.pixelSize, canvasSize) }
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default withWeb3(Canvas)
