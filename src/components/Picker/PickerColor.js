import React from 'react'

import './PickerColor.css'


export const PickerColor = (props) => {
  const bindedChangeColor = props.changeColor.bind(null, { color: props.color, index: props.index })
  return (
    <div className={'PickerColor ' + (props.isSelected ? 'PickerColor--selected' : '')}
         style={{ width: props.size, height: props.size }}
         onClick={bindedChangeColor}>
      <span className="PickerColor__color" style={{ backgroundColor: props.color }}/>
    </div>
  )
}

PickerColor.propTypes = {}
PickerColor.defaultProps = {}
