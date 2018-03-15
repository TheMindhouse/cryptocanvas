import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import canvasBg from '../../assets/images/bg.png'
import CanvasPixel from './CanvasPixel'

class CanvasStage extends React.Component {
  stage = {}

  constructor () {
    super()
    this.state = {
      scale: 1,
    }
  }

  componentDidMount () {
    this.stage = this.refs.canvas.getStage()
  }

  setCanvasScale = (newScale) => {
    console.log(`Set canvas scale to ${newScale * 100}%`)

    this.stage.scale({ x: newScale, y: newScale })

    const newPosition = this.calculateNewPosition({ x: this.stage.x(), y: this.stage.y() })
    this.stage.position(newPosition)
    this.stage.batchDraw()

    this.setState({ scale: newScale })
  }

  /**
   * Limit stage bounds when dragging and zooming to the size of the painting
   *
   * @param {{x: number, y: number}} - desired new position of the stage
   * @return {{x: number, y: number}} - calculated new position
   */
  calculateNewPosition = ({ x, y } = {}) => {
    const maxX = (this.stage.scaleX() - 1) * this.stage.getWidth()
    const maxY = (this.stage.scaleY() - 1) * this.stage.getHeight()

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

  render () {
    const gridCols = Math.sqrt(this.props.pixels.length)
    const canvasSize = gridCols * this.props.pixelSize

    return (
      <div>
        <div>
          <p onClick={() => this.setCanvasScale(1)}>100%</p>
          <p onClick={() => this.setCanvasScale(1.5)}>150%</p>
          <p onClick={() => this.setCanvasScale(2)}>200%</p>
        </div>
        <Stage
          ref="canvas"
          width={canvasSize}
          height={canvasSize}
          style={{
            'background': `url(${canvasBg})`,
            'backgroundSize': this.props.pixelSize * this.props.scale,
            'width': canvasSize,
            'cursor': 'pointer'
          }}
          draggable="true"
          dragBoundFunc={this.calculateNewPosition}
        >
          <Layer ref="layer"
                 onMouseOver={this.onMouseOver}
          >
            {
              this.props.pixels.map((color, index) =>
                <CanvasPixel
                  color={color}
                  index={index}
                  pixelSize={this.props.pixelSize}
                  gridCols={gridCols}
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
              width={this.props.pixelSize}
              height={this.props.pixelSize}
              fill="#000"
              opacity="0.4"
              visible={false}
              onMouseMove={this.onMouseMove}
            />
            <Rect
              ref="highlightColor"
              x="0"
              y="0"
              width={this.props.pixelSize - 2}
              height={this.props.pixelSize - 2}
              fill={this.props.currentColorHex}
              visible={false}
              cornerRadius={this.props.pixelSize / 4}
              listening={false}
              stroke="#fff"
              strokeWidth="1"
              shadowColor="#000"
              shadowOpacity="0.6"
              strokeScaleEnabled={false}
              shadowBlur={this.props.pixelSize * 2}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

CanvasStage.propTypes = {}
CanvasStage.defaultProps = {}

export default CanvasStage
