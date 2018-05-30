// @flow
import * as React from 'react'
import './styles/SelectedPixel.css'
import type { PixelIndex } from '../../types/PixelIndex'
import { Icon } from 'antd'
import { hexPalette } from '../../helpers/colors'

type Props = {
  pixelIndex: PixelIndex,
  pixelSize: number,
  colorId: number,
}

class SelectedPixel extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const pixelSize = this.props.pixelSize
    const left = this.props.pixelIndex.x * pixelSize
    const top = this.props.pixelIndex.y * pixelSize

    return (
      <div className="SelectedPixel" style={{
        transform: `translate(${left}px, ${top}px`,
        width: pixelSize,
        height: pixelSize,
      }}>
        <div className="SelectedPixel__color" style={{
          backgroundColor: hexPalette[ this.props.colorId ]
        }}>
          <Icon type="loading" />
        </div>
      </div>
    )
  }
}

export { SelectedPixel }
