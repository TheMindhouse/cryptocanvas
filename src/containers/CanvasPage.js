import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'

import canvasBg from '../assets/images/bg.png'
import CanvasPixel from '../components/CanvasPixel'
import withWeb3 from '../hoc/withWeb3'
import { Picker } from '../components/Picker/Picker'
import { convertColorToRGB } from '../helpers/colors'

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
      scale: 1
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

    this.setState({ scale: newScale })
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

  onMouseOver = (evt) => {
    if (!this.state.currentColorIndex) {
      return
    }
    console.log(evt);

    var box = evt.target
    // console.log(`IN -> `, box);
    // console.log('fill', box.attrs.fillOriginal, 'opacity', box.attrs.opacityOriginal);
    this.refs.layer2.clear()
    this.refs.highlight.x(box.x())
    this.refs.highlight.y(box.y())
    this.refs.highlight.show()
    // this.refs.highlight.draw()

    const stage = this.refs.canvas.getStage()
    const mousePos = stage.getPointerPosition()
    this.refs.highlightColor.x((mousePos.x / stage.scaleX()) - (this.pixelSize - 2) / 2)
    this.refs.highlightColor.y((mousePos.y / stage.scaleY()) - (this.pixelSize - 2) / 2)
    this.refs.highlightColor.show()
    this.refs.layer2.draw()
    // box.draw();
    // this.refs.layer2.add(box)
    // this.refs.layer2.draw()
  }

  onMouseOut = (evt) => {
    console.log(evt);
    var box = evt.target;

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
    const gridCols = Math.sqrt(this.state.pixels.length)
    const canvasSize = gridCols * this.pixelSize

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
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
            style={{ 'background': `url(${canvasBg})`, 'backgroundSize': this.pixelSize * this.state.scale, 'width': canvasSize, 'cursor': 'pointer' }}
            draggable="true"
            dragBoundFunc={this.dragBoundFunc}
        >
          <Layer ref="layer"
                 onMouseOver={this.onMouseOver}
          >
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

          <Layer ref="layer2"
                 width={canvasSize}
                 height={canvasSize}
                 onMouseOut={this.onMouseOut}
          >
            <Rect
              ref="highlight"
              width={this.pixelSize}
              height={this.pixelSize}
              fill="#000"
              opacity="0.4"
              visible={false}
              onMouseMove={this.onMouseMove}
            />
            <Rect
              ref="highlightColor"
              x="0"
              y="0"
              width={this.pixelSize - 2}
              height={this.pixelSize - 2}
              fill={this.state.currentColorHex}
              visible={false}
              cornerRadius={this.pixelSize / 4}
              listening={false}
              stroke="#fff"
              strokeWidth="1"
              shadowColor="#000"
              shadowOpacity="0.6"
              strokeScaleEnabled={false}
              shadowBlur={this.pixelSize * 2}
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

export default withWeb3(CanvasPage)
