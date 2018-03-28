import React from 'react'
import { Stage } from 'react-konva'
import canvasBg from '../../assets/images/bg.png'
import CanvasLayers from './CanvasLayers'

import { Slider } from 'antd'

import './CanvasStage.css'

const marks = {
  0: '100%',
  1: '150%',
  2: '200%',
  3: '250%',
  4: '300%',
  5: '350%',
  6: '400%',
  7: '450%',
  8: '500%',
};

const scales = [ 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 ]

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

  /**
   * Change the zoom of the stage
   *
   * @param newScale {number} - 1 equals 100% size
   */
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
    const gridColumns = Math.sqrt(this.props.pixels.length)
    const canvasSize = gridColumns * this.props.pixelSize

    return (
      <div>
        <div style={{display: 'none', margin: '0 auto'}}>

          <Slider marks={marks}
                  min={0}
                  max={scales.length - 1}
                  step={1}
                  defaultValue={0}
                  value={scales.indexOf(this.state.scale)}
                  onChange={(i) => this.setCanvasScale(scales[i])} />

        </div>
        <Stage
          className="CanvasStage"
          ref="canvas"
          width={canvasSize}
          height={canvasSize}
          style={{
            'background': `url(${canvasBg})`,
            'backgroundSize': this.props.pixelSize,
            'width': canvasSize,
            'cursor': (this.props.currentColorHex || this.state.scale > 1) ? 'pointer' : 'default'
          }}
          draggable="true"
          dragBoundFunc={this.calculateNewPosition}
        >

          <CanvasLayers pixels={this.props.pixels}
                        pixelSize={this.props.pixelSize}
                        canvasSize={canvasSize}
                        gridColumns={gridColumns}
                        currentColorHex={this.props.currentColorHex}
                        stage={this.stage}
                        scale={this.state.scale}
                        changePixelColor={this.props.changePixelColor}
          />

        </Stage>
      </div>
    )
  }
}

CanvasStage.propTypes = {}
CanvasStage.defaultProps = {}

export default CanvasStage
