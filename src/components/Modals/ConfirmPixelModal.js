import React from 'react'
import { ColorPreview } from '../ColorPreview/ColorPreview'
import { Row } from 'antd'
import './styles/ConfirmPixel.css'

const ConfirmPixelModal = ({ x, y, color }) => {
  return (
    <Row type="flex" justify="center" align="center" className="ConfirmPixel" gutter={30}>
      <div>
        <b>Coords:</b><br />
        <span>x: </span>
        <span className="ConfirmPixel_Coords">{x}</span>
        <span>y: </span>
        <span className="ConfirmPixel_Coords">{y}</span>
      </div>
      <div>
        <ColorPreview colorId={color} />
      </div>
    </Row>
  )
}

ConfirmPixelModal.propTypes = {}
ConfirmPixelModal.defaultProps = {}

export default ConfirmPixelModal
