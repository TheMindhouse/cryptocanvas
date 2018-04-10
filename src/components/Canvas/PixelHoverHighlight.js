// @flow
import * as React from 'react'
import './styles/PixelHoverHighlight.css'

type Props = {}

class PixelHoverHighlight extends React.PureComponent<Props> {
  static defaultProps = {}
  
  render() {
    const pixelSize = this.props.pixelSize
    const left = this.props.indexX * pixelSize
    const top = this.props.indexY * pixelSize

    return (
      <div className="PixelHoverHighlight" style={{
        transform: `translate(${left}px, ${top}px`,
        width: pixelSize,
        height: pixelSize,
      }}>
      </div>
    )
  }
}

export { PixelHoverHighlight }
