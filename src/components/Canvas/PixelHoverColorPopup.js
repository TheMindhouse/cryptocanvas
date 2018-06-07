// @flow
import * as React from 'react'
import './styles/PixelHoverColorPopup.css'
import type { MouseCoords } from '../../types/MouseCoords'
import { hexPalette } from '../../helpers/colors'
import { Icon } from 'antd'

type Props = {
  mousePosition: MouseCoords,
  pixelSize: number,
  colorId: number,
  scale: number,
  offsetX: number,
  offsetY: number,
  canPaintHoveredPixel: boolean,
}

class PixelHoverColorPopup extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {

    const {
      mousePosition,
      scale,
      pixelSize,
      offsetX,
      offsetY,
      colorId,
      canPaintHoveredPixel,
    } = this.props

    const x = (mousePosition.x / scale) - pixelSize / 2 + offsetX
    const y = (mousePosition.y / scale) - pixelSize / 2 + offsetY
    return (
      <div className="PixelHoverColorPopup" style={{
        transform: `translate(${x}px, ${y}px`,
        width: pixelSize,
        height: pixelSize,
      }}>
        {
          !canPaintHoveredPixel &&
          <div className="PixelHoverColorPopup__Icon">
            <Icon type="close" style={{ fontSize: `calc(${pixelSize}px / 1.2 )` }} />
          </div>
        }
        <div className="PixelHoverColorPopup__Background" style={{
          backgroundColor: hexPalette[ colorId ],
          opacity: canPaintHoveredPixel ? 1 : 0.7
        }} />
      </div>
    )
  }
}

export { PixelHoverColorPopup }
