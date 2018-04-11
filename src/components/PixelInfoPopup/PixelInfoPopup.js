// @flow
import * as React from 'react'
import './styles/PixelInfoPopup.css'
import { Card, Icon } from 'antd'
import type { PixelIndex } from '../../types/PixelIndex'
import PixelInfoPopupPainter from './PixelInfoPopupPainter'
import { ClickableColorPreview } from '../ColorPreview/ClickableColorPreview'

type Props = {
  pixelPopup: PixelIndex,
  colorId: number,
  canvasId: number,
  pixelSize: number,
  onCopyColor: (colorId: number) => void,
  onClose: () => void,
}

const POPUP_WIDTH = 210


class PixelInfoPopup extends React.PureComponent<Props> {
  static defaultProps = {}

  onCopyColor = () => {
    this.props.onCopyColor(this.props.colorId)
    this.props.onClose()
  }


  render () {
    if (!this.props.pixelPopup) {
      return null
    }

    const left = (this.props.pixelPopup.x * this.props.pixelSize) - (POPUP_WIDTH / 2) + (this.props.pixelSize / 2)
    const top = (this.props.pixelPopup.y * this.props.pixelSize)

    return (
      <div className="PixelInfoPopup" style={{ left, top }}>
        <Card className="PixelInfoPopup__card"
              title={'Pixel #' + this.props.pixelPopup.id}
              extra={<a onClick={this.props.onClose}><Icon type="close" style={{ fontSize: 16, color: '#222' }} /></a>}
              style={{ width: POPUP_WIDTH }}>
          <ClickableColorPreview
            colorId={this.props.colorId}
            onClick={this.onCopyColor}
          />
          <br />
          <h4>Painter:</h4>
          {
            this.props.colorId > 0
            ? <PixelInfoPopupPainter pixelId={this.props.pixelPopup.id} canvasId={this.props.canvasId}/>
            : <span>No painter yet, be the first!</span>
          }
        </Card>
      </div>
    )
  }
}

export default PixelInfoPopup
