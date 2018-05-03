import React from 'react'
import { Row, Spin } from 'antd'
import { CONFIG } from '../../config'

class CanvasStagePlaceholder extends React.PureComponent {
  state = {
    canvasSize: 0
  }

  componentDidMount () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    const canvasActualWidth = window.innerWidth - 40
    const canvasFullWidth = CONFIG.gridColumns * CONFIG.pixelSize.canvas
    const canvasSize = canvasActualWidth < canvasFullWidth ? canvasActualWidth : canvasFullWidth
    this.setState({ canvasSize })
  }

  render () {
    return (
      <Row type="flex" align="middle" justify="center" className="CanvasStage CanvasStage--Placeholder"
        style={{ width: this.state.canvasSize, height: this.state.canvasSize }}>
          <Spin size="large" />
      </Row>
    )
  }
}

CanvasStagePlaceholder.propTypes = {}
CanvasStagePlaceholder.defaultProps = {}

export default CanvasStagePlaceholder
