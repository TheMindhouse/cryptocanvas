// @flow
import * as React from 'react'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import { SelectedPixel } from '../../models/SelectedPixel'
import { hexPalette } from '../../helpers/colors'
import './styles/SelectedPixelsInfo.css'
import { Row } from 'antd'
import * as pluralize from 'pluralize'

type Props = {
  canvasId: number,
  // withSelectedPixels
  selectedPixelsStore: SelectedPixelsProviderState
}

const COLOR_PREVIEW_LIMIT = 19

class SelectedPixelsInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
    const pixelsCutFromPreview = selectedPixels.length - COLOR_PREVIEW_LIMIT

    if (!selectedPixels.length) {
      return <p>Click on a pixel to select</p>
    }
    return (
      <div>
        <Row type="flex" align="middle" className="SelectedPixelsPreview">
          {selectedPixels.slice(0, COLOR_PREVIEW_LIMIT).map((pixel: SelectedPixel, i: number) =>
            <div className="SelectedPixelsPreview__Color" key={i}
                 style={{ backgroundColor: hexPalette[ pixel.colorId ] }} />
          )}
          {
            pixelsCutFromPreview > 0 && <span>&bull;&bull;&bull; {pixelsCutFromPreview} more</span>
          }
        </Row>
        <p><a href="#">{selectedPixels.length} {pluralize('pixel', selectedPixels.length)} selected</a></p>
      </div>
    )
  }
}

SelectedPixelsInfo = withSelectedPixels(SelectedPixelsInfo)
export { SelectedPixelsInfo }
