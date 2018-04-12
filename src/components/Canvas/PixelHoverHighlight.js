// @flow
import * as React from 'react'
import './styles/PixelHoverHighlight.css'
import type { PixelIndex } from '../../types/PixelIndex'
import { Icon } from 'antd'

type Props = {
  pixelSize: number,
  pixelHovered: PixelIndex,
  showDetailsIcon: boolean,
}

class PixelHoverHighlight extends React.Component<Props> {
  static defaultProps = {}

  shouldComponentUpdate (nextProps: Props) {
    return JSON.stringify(this.props.pixelHovered) !== JSON.stringify(nextProps.pixelHovered)
  }

  render() {
    const pixelSize = this.props.pixelSize
    const left = this.props.pixelHovered.x * pixelSize
    const top = this.props.pixelHovered.y * pixelSize

    return (
      <div className="PixelHoverHighlight" style={{
        transform: `translate(${left}px, ${top}px`,
        width: pixelSize,
        height: pixelSize,
      }}>
        { this.props.showDetailsIcon && <Icon type="search" /> }

      </div>
    )
  }
}

export { PixelHoverHighlight }
