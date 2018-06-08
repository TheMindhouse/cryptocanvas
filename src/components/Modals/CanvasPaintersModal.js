// @flow
import * as React from 'react'
import { URLHelper } from '../../helpers/URLhelper'
import { canvasPainters } from '../../localStorage/canvasPainters'
import { PixelsOwnedInfo } from '../CanvasSidebar/PixelsOwnedInfo'

type Props = {
  canvasPainters: Object, // { PAINTER_ADDRESS: Array<PIXEL_ID> }
  userAccount: string,
  isCanvasFinished: boolean,
}

const PaintersList = ({ canvasPainters }) =>
  Object.keys(canvasPainters)
    .sort((a: string, b: string) => canvasPainters[ b ].length - canvasPainters[ a ].length)
    .map(((address: string, index: number) => {
      const pixels = canvasPainters[ address ].length
      return (
        <p key={index}>
          <a href={URLHelper.account(address)}>{address}</a> - {pixels} {pixels !== 1 ? 'pixels' : 'pixel'}
        </p>
      )
    }))



const CanvasPaintersModal = (props: Props) => {
  const {
    canvasPainters,
    userAccount,
    isCanvasFinished,
  } = props

  const pixelsOwned = canvasPainters[userAccount] ? canvasPainters[userAccount].length : 0

  return (
    <div>
      {
        !!pixelsOwned &&
        <PixelsOwnedInfo
          pixelsOwned={pixelsOwned}
          isCanvasFinished={isCanvasFinished} />
      }
      <br />
      <PaintersList canvasPainters={canvasPainters} />
    </div>
  )
}

export { CanvasPaintersModal }
