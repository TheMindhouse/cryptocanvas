// @flow
import * as React from 'react'
import type { PixelIndex } from '../../types/PixelIndex'

type Props = {
  pixelIndex: PixelIndex,
  style?: Object,
}

class PixelCoords extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const {
      x,
      y,
    } = this.props.pixelIndex
    return (
      <div style={this.props.style}>
        <b>Coordinates:</b><br />
        <span>x: </span>
        <span className="ConfirmPixel_Coords">{x}</span>
        <span>y: </span>
        <span className="ConfirmPixel_Coords">{y}</span>
      </div>
    )
  }
}

export { PixelCoords }
