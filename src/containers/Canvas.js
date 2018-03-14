import React from 'react'
import { Stage, Layer, Line} from 'react-konva'

import canvasBg from '../assets/images/bg.png'
import CanvasPixel from '../components/CanvasPixel'
import withWeb3 from '../hoc/withWeb3'
import { Picker } from '../components/Picker/Picker'
import { convertColorToRGB } from '../helpers/colors'

class Canvas extends React.Component {
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

  setCanvasScale = (newScale) => {
    console.log(`Set canvas zoom to ${newScale * 100}%`)

    const stage = this.refs.canvas.getStage()

    stage.scale({ x: newScale, y: newScale })


    const x = stage.x()
    const y = stage.y()

    const maxX = (stage.scaleX() - 1) * stage.getWidth()
    const maxY = (stage.scaleY() - 1) * stage.getHeight()

    const newX = (x > 0)
      ? 0
      : (x < -maxX)
        ? -maxX
        : x
    const newY = (y > 0)
      ? 0
      : (y < -maxY)
        ? -maxY
        : y

    const newPos = {
      x: newX,
      y: newY
    };
    stage.position(newPos);

    stage.batchDraw();
  }

  dragBoundFunc = (pos) => {
    const stage = this.refs.canvas.getStage()

    const x = pos.x
    const y = pos.y
    const maxX = (stage.scaleX() - 1) * stage.getWidth()
    const maxY = (stage.scaleY() - 1) * stage.getHeight()

    const newX = (x > 0)
      ? 0
      : (x < -maxX)
        ? -maxX
        : x
    const newY = (y > 0)
      ? 0
      : (y < -maxY)
        ? -maxY
        : y

    return {
      x: newX,
      y: newY
    }
  }

  onMouseOver = () => {
    console.log('mouseover');
    const stage = this.refs.canvas.getStage()
    const gridCols = Math.sqrt(this.state.pixels.length)

    const pos = stage.getPointerPosition()
    const hovering = Math.floor(pos.y / this.pixelSize) * gridCols + Math.floor(pos.x / this.pixelSize)
    this.setState({ hovering })
    console.log(pos);
  }

  render () {
    const gridCols = Math.sqrt(this.state.pixels.length)
    const canvasSize = gridCols * this.pixelSize
    return (
      <div style={{ display: 'flex' }}>
        {this.state.isLoading && <p>Canvas loading...</p>}
        <div>
          <p onClick={() => this.setCanvasScale(1)}>100%</p>
          <p onClick={() => this.setCanvasScale(1.5)}>150%</p>
          <p onClick={() => this.setCanvasScale(2)}>200%</p>
        </div>
        <Stage
            ref="canvas"
            width={canvasSize}
            height={canvasSize}
            style={{ 'background': `url(${canvasBg})`, 'backgroundSize': this.pixelSize * 1.6, 'width': canvasSize }}
            draggable="true"
            dragBoundFunc={this.dragBoundFunc}
            onMouseOver={this.onMouseOver}
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
            <CanvasPixel
              color="rgb(0, 0, 0)"
              index={this.state.hovering}
              pixelSize={this.pixelSize}
              gridCols={gridCols}
              handlePixelClick={this.handlePixelClick}
            />
          </Layer>

        </Stage>

        <Picker
          changeColor={this.changeColor}
          currentColor={this.state.currentColorIndex}
        />
      </div>
    )
  }
}

export default withWeb3(Canvas)
