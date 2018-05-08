// @flow
import * as React from 'react'
import { URLHelper } from '../../helpers/URLhelper'

type Props = {
  canvasPainters: Object,
}

const CanvasPaintersModal = ({ canvasPainters }: Props) => {
  return Object.keys(canvasPainters)
    .sort((a: string, b: string) => canvasPainters[ b ].length - canvasPainters[ a ].length)
    .map(((address: string, index: number) => {
      const pixels = canvasPainters[ address ].length
      return (
        <p key={index}>
          <a href={URLHelper.account(address)}>{address}</a> - {pixels} {pixels !== 1 ? 'pixels' : 'pixel'}
        </p>
      )
    }))
}


export { CanvasPaintersModal }
