// @flow
import * as React from 'react'
import './styles/LoadingPixel.css'
import type { PixelIndex } from '../../types/PixelIndex'
import { Icon } from 'antd'
import { hexPalette } from '../../helpers/colors'

type Props = {
  pixelIndex: PixelIndex,
  pixelSize: number,
  colorId: number,
}

class LoadingPixel extends React.PureComponent<Props> {
  static defaultProps = {}
  
  render() {
    const pixelSize = this.props.pixelSize
    const left = this.props.pixelIndex.x * pixelSize
    const top = this.props.pixelIndex.y * pixelSize

    return (
      <div className="LoadingPixel" style={{
        transform: `translate(${left}px, ${top}px`,
        width: pixelSize,
        height: pixelSize,
        backgroundColor: hexPalette[this.props.colorId]
      }}>
        <Icon type="loading" style={{ fontSize: `calc(${pixelSize}px / 2)`}} />
      </div>
    )
  }
}

export { LoadingPixel }
