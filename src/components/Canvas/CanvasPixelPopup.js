// @flow
import * as React from 'react'
import './styles/CanvasPixelPopup.css'
import { Card } from 'antd'

type Props = {
  index: number,
  position: {
    x: number,
    y: number,
  },
  color: number,
  pixelSize: number,
  onClose: () => void,
}

const POPUP_WIDTH = 300

class CanvasPixelPopup extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    if (this.props.index === null) {
      return null
    }

    const left = this.props.position.x - (POPUP_WIDTH / 2) + (this.props.pixelSize / 2)
    const top = this.props.position.y
    return (
      <div className="CanvasPixelPopup" style={{ left, top }}>
        <Card className="CanvasPixelPopup__card"
              title={'Pixel #' + this.props.index}
              extra={<a onClick={this.props.onClose}>close</a>} style={{ width: 300 }}>
          <h4>Color: #{this.props.color}</h4>
          <a href="#">copy color</a>
          <h4>Painter:</h4>
          <span>Loading...</span>
        </Card>
      </div>
    )
  }
}

export { CanvasPixelPopup }
