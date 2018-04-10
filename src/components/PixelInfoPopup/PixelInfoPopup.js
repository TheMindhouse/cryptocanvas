// @flow
import * as React from 'react'
import './styles/PixelInfoPopup.css'
import { Card } from 'antd'
import type { PixelIndex } from '../../types/PixelIndex'
import withWeb3 from '../../hoc/withWeb3'
import { ColorPreview } from '../ColorPreview/ColorPreview'
import PixelInfoPopupPainter from './PixelInfoPopupPainter'

type Props = {
  pixelPopup: PixelIndex,
  colorId: number,
  canvasId: number,
  pixelSize: number,
  onClose: () => void,
}

const POPUP_WIDTH = 210

class PixelInfoPopup extends React.PureComponent<Props> {
  static defaultProps = {}

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
              extra={<a onClick={this.props.onClose}>close</a>} style={{ width: POPUP_WIDTH }}>
          <ColorPreview colorId={this.props.colorId} />
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
