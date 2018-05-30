// @flow
import React from 'react'
import { ColorPreview } from '../ColorPreview/ColorPreview'
import { Row } from 'antd'
import './styles/ConfirmPixel.css'

type Props = {
  x: number,
  y: number,
  colorId: number,
}

const ConfirmPixelModal = ({ x, y, colorId }: Props) => {
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
          <ColorPreview colorId={colorId} />
        </div>
      </Row>
    </div>
  )
}

export { ConfirmPixelModal }
