// @flow
import * as React from 'react'
import './styles/LoadingPixel.css'
import type { PixelIndex } from '../../types/PixelIndex'
import { Icon } from 'antd'

type Props = {
  pixelIndex: PixelIndex,
  pixelSize: number,
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
      }}>
        <Icon type="loading" />
      </div>
    )
  }
}

export { LoadingPixel }
