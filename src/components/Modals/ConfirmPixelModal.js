import React from 'react'
import { ColorPreview } from '../ColorPreview/ColorPreview'
import { Row } from 'antd'
import './styles/ConfirmPixel.css'
import { TermsInfo } from '../Small/TermsInfo'

const ConfirmPixelModal = ({ x, y, color }) => {
  return (
    <div>
      <Row type="flex" justify="center" align="center" className="ConfirmPixel" gutter={30}>
        <div>
          <b>Coordinates:</b><br />
          <span>x: </span>
          <span className="ConfirmPixel_Coords">{x}</span>
          <span>y: </span>
          <span className="ConfirmPixel_Coords">{y}</span>
        </div>
        <div>
          <ColorPreview colorId={color} />
        </div>
      </Row>
      <TermsInfo />
    </div>
  )
}

ConfirmPixelModal.propTypes = {}
ConfirmPixelModal.defaultProps = {}

export default ConfirmPixelModal
