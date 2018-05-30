// @flow
import * as React from 'react'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import { SelectedPixel } from '../../models/SelectedPixel'
import { hexPalette } from '../../helpers/colors'
import './styles/SelectedPixelsInfo.css'
import { Row, Modal, Col } from 'antd'
import * as pluralize from 'pluralize'
import { ConfirmPixelModal } from '../Modals/ConfirmPixelModal'

type Props = {
  canvasId: number,
  // withSelectedPixels
  selectedPixelsStore: SelectedPixelsProviderState
}

const COLOR_PREVIEW_LIMIT = 19

class SelectedPixelsInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  showModal = () => {
    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
      .sort((a: SelectedPixel, b: SelectedPixel) => a.pixelIndex.y - b.pixelIndex.y || a.pixelIndex.x - b.pixelIndex.x)
    Modal.info({
      title: `You have selected ${selectedPixels.length} ${pluralize('pixel', selectedPixels.length)} to paint`,
      width: 750,
      maskClosable: true,
      content: (
        <Row type="flex" align="middle">
          {selectedPixels.map((pixel: SelectedPixel) =>
            <Col span={12}>
              <ConfirmPixelModal
                x={pixel.pixelIndex.x}
                y={pixel.pixelIndex.y}
                colorId={pixel.colorId} />
            </Col>
          )}
        </Row>
      ),
      onOk () {},
    })
  }

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
        <p><a href="#"
              onClick={this.showModal}>{selectedPixels.length} {pluralize('pixel', selectedPixels.length)} selected</a>
        </p>
      </div>
    )
  }
}

SelectedPixelsInfo = withSelectedPixels(SelectedPixelsInfo)
export { SelectedPixelsInfo }
