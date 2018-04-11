// @flow
import React from 'react'

import './PickerColor.css'
import { hexPalette } from '../../helpers/colors'

type Props = {
  colorId: number,
  size: number,
  changeActiveColor: (number) => void,
  isSelected: boolean,
}

export const PickerColor = (props: Props) => {
  const changeActiveColor = () => {
    props.changeActiveColor(props.colorId)
  }

  return (
    <div className={'PickerColor ' + (props.isSelected ? 'PickerColor--selected' : '')}
         style={{ width: props.size, height: props.size }}
         onClick={changeActiveColor}>
      <span className={'PickerColor__color ' + (props.colorId === 0 ? 'PickerColor__color--reset' : '')}
            style={{ backgroundColor: hexPalette[props.colorId] }} />
    </div>
  )
}

PickerColor.defaultProps = {}
