// @flow
import * as React from 'react'
import './styles/PixelHoverColorPopup.css'
import type { MouseCoords } from '../../types/MouseCoords'
import { hexPalette } from '../../helpers/colors'

type Props = {
  mousePosition: MouseCoords,
  pixelSize: number,
  colorId: number,
}

class PixelHoverColorPopup extends React.PureComponent<Props> {
  static defaultProps = {}

  render() {
    const x = this.props.mousePosition.x - this.props.pixelSize / 2
    const y = this.props.mousePosition.y - this.props.pixelSize / 2
    return (
      <div className="PixelHoverColorPopup" style={{
        transform: `translate(${x}px, ${y}px`,
        width: this.props.pixelSize,
        height: this.props.pixelSize,
        backgroundColor: hexPalette[this.props.colorId],
      }}>
      </div>
    )
  }
}

export { PixelHoverColorPopup }
