// @flow
import React from 'react'
import { Button, message, Modal, Row, Tooltip } from 'antd'
import type { WithModal } from '../../types/WithModal'
import { SelectedPixel } from '../../models/SelectedPixel'
import * as pluralize from 'pluralize'
import { CONFIG } from '../../config'
import { hexPalette } from '../../helpers/colors'
import './styles/SelectedPixelsModal.css'

type Props = {
  selectedPixels: Array<SelectedPixel>,
  removeSelectedPixel: (SelectedPixel) => boolean,
  modal: WithModal,
}

const SingleSelectedPixel = ({ pixel, deselectPixel }:
                             { pixel: SelectedPixel,
                               deselectPixel: (SelectedPixel) => boolean,
                             }) => (
  <Tooltip placement="top" title="Click to deselect" key={pixel.pixelIndex.id}>
    <div className="SelectedPixelsModal__Pixel"
         style={{
           width: CONFIG.pixelSize.canvas,
           height: CONFIG.pixelSize.canvas,
           top: pixel.pixelIndex.y * CONFIG.pixelSize.canvas,
           left: pixel.pixelIndex.x * CONFIG.pixelSize.canvas,
           backgroundColor: hexPalette[ pixel.colorId ],
         }}
         onClick={() => deselectPixel(pixel)}
    />
  </Tooltip>
)

class SelectedPixelsModal extends React.PureComponent<Props> {
  deselectPixel = (pixel: SelectedPixel): boolean => {
    if (this.props.removeSelectedPixel(pixel)) {
      message.success(`Pixel deselected`)
      // Close modal if this was the last pixel
      if (this.props.selectedPixels.length === 1) {
        this.props.modal.close()
      }
      return true
    }
    return false
  }

  deselectAll = () => {
    this.props.selectedPixels.forEach((pixel: SelectedPixel) => this.props.removeSelectedPixel(pixel))
    message.success(`All pixels deselected`)
    this.props.modal.close()
  }

  render () {
    const canvasSize = CONFIG.pixelSize.canvas * CONFIG.gridColumns

    return (
      <Modal
        title={`You have selected ${this.props.selectedPixels.length} ${pluralize('pixel', this.props.selectedPixels.length)} to paint`}
        visible={this.props.modal.isVisible}
        onCancel={this.props.modal.close}
        width={canvasSize + 50}
        footer={[
          <Button type="danger" onClick={this.deselectAll} key="0">Deselect All</Button>,
          <Button type="primary" onClick={this.props.modal.close} key="1">Close Modal</Button>,
        ]}
      >
        <Row type="flex" align="middle">
          <div className="SelectedPixelsModal" style={{ width: canvasSize, height: canvasSize }}>
            {
              this.props.selectedPixels.map((pixel: SelectedPixel) =>
                <SingleSelectedPixel pixel={pixel} deselectPixel={this.deselectPixel} key={pixel.pixelIndex.id}/>
              )}
          </div>
        </Row>
      </Modal>
    )
  }
}

export default SelectedPixelsModal
