import React from 'react'

import './PickerColor.css'

export const PickerColor = (props) => {
  const changeColor = () => {
    const { color, index } = props
    if (index === 0) {
      props.changeColor({ color: null, index: null })
      return
    }
    props.changeColor({ color, index })
  }

  return (
    <div className={'PickerColor ' + (props.isSelected ? 'PickerColor--selected' : '')}
         style={{ width: props.size, height: props.size }}
         onClick={changeColor}>
      <span className={'PickerColor__color ' + (props.index === 0 ? 'PickerColor__color--reset' : '')}
            style={{ backgroundColor: props.color }} />
    </div>
  )
}

PickerColor.propTypes = {}
PickerColor.defaultProps = {}
