import React from 'react'
import { hexPalette } from '../../helpers/colors'
import PickerColor from './PickerColor'
import './Picker.css'
import { ColorPreview } from '../ColorPreview/ColorPreview'

const COLOR_WIDTH = 14
const PICKER_SIZE = COLOR_WIDTH * Math.sqrt(hexPalette.length)

export class Picker extends React.Component {
  render () {
    return (
      <div>
        <div className="Picker" style={{ width: PICKER_SIZE }}>
          {hexPalette.map((hex, colorId) =>
            <PickerColor
              colorId={colorId}
              key={colorId}
              size={COLOR_WIDTH}
              isSelected={colorId === this.props.activeColorId}
              changeActiveColor={this.props.changeActiveColor}
            />)}
          <ColorPreview
            colorId={this.props.activeColorId}
            style={{ width: PICKER_SIZE, margin: '3px 0 15px'}}
          />
        </div>
      </div>
    )
  }
}
