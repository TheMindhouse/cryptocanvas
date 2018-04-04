import React from 'react'
import { hexPalette } from '../../helpers/colors'
import { PickerColor } from './PickerColor'
import './Picker.css'

const COLOR_WIDTH = 16
const PICKER_SIZE = COLOR_WIDTH * Math.sqrt(hexPalette.length)

const getColorLabel = (color) => {
  return (color > 0)
    ? `#${color}`
    : 'Choose a color'
}

const getPickerClass = (color) => {
  let className = 'CurrentColor '
  if (!color) {
    return className + 'CurrentColor--empty'
  }
  if (color < 64) {
    return className + 'CurrentColor--light'
  }
  return className + 'CurrentColor--dark'
}

export class Picker extends React.Component {
  render () {
    const { currentColor } = this.props
    return <div>
      <div className={getPickerClass(currentColor)}
           style={{ backgroundColor: hexPalette[ currentColor ] }}>
        {getColorLabel(currentColor)}
      </div>
      <div className="Picker" style={{ width: PICKER_SIZE, height: PICKER_SIZE }}>
        {
          !this.props.isEnabled &&
          <div className="PickerDisabled">
            <span>Enable Ethereum to paint on the Canvas</span>
          </div>
        }
        {hexPalette.map((color, index) =>
          <PickerColor
            color={color}
            index={index}
            key={index}
            size={COLOR_WIDTH}
            isSelected={currentColor === index}
            changeColor={this.props.changeColor}
          />)}
      </div>
    </div>
  }
}
