import React from 'react'
import { hexPalette } from '../../helpers/colors'
import { PickerColor } from './PickerColor'
import './Picker.css'

const COLOR_WIDTH = 16
const PICKER_SIZE = COLOR_WIDTH * Math.sqrt(hexPalette.length)

export class Picker extends React.Component {
  render () {
    return <div>
      <div className="CurrentColor" style={{ backgroundColor: hexPalette[ this.props.currentColor ] }} />
      <div className="Picker" style={{ width: PICKER_SIZE, height: PICKER_SIZE }}>
        {hexPalette.map((color, index) =>
          <PickerColor
            color={color}
            index={index}
            key={index}
            size={COLOR_WIDTH}
            isSelected={this.props.currentColor === index}
            changeColor={this.props.changeColor}
          />)}
      </div>
    </div>
  }
}
