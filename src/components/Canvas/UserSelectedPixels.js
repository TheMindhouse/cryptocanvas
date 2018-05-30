// @flow
import * as React from 'react'
import { UserSelectedPixel } from './UserSelectedPixel'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import { SelectedPixel } from '../../models/SelectedPixel'

type Props = {
  selectedPixelsStore: SelectedPixelsProviderState,
  pixelSize: number,
  canvasId: number,
}

class UserSelectedPixels extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <div>
        {this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
          .map((selectedPixel: SelectedPixel, i: number) =>
            <UserSelectedPixel
              pixelIndex={selectedPixel.pixelIndex}
              pixelSize={this.props.pixelSize}
              colorId={selectedPixel.colorId}
              key={i}
            />
          )}
      </div>
    )
  }
}

export default withSelectedPixels(UserSelectedPixels)
