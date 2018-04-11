import React from 'react'
import { hexPalette } from '../../helpers/colors'
import { PickerColor } from './PickerColor'
import './Picker.css'
import { ColorPreview } from '../ColorPreview/ColorPreview'

const COLOR_WIDTH = 16
const PICKER_SIZE = COLOR_WIDTH * Math.sqrt(hexPalette.length)

export class Picker extends React.Component {
  render () {
    const { currentColor } = this.props
    return (
      <div>
        <ColorPreview colorId={this.props.activeColorId} style={{ width: PICKER_SIZE, margin: '30px 0'}}/>
        <div className="Picker" style={{ width: PICKER_SIZE, height: PICKER_SIZE }}>
          {
            this.props.isDisabled &&
            <div className="Picker__DisabledOverlay">
              <span>Enable Ethereum to paint on the Canvas</span>
            </div>
          }
          {hexPalette.map((hex, colorId) =>
            <PickerColor
              colorId={colorId}
              key={colorId}
              size={COLOR_WIDTH}
              isSelected={currentColor === colorId}
              changeActiveColor={this.props.changeActiveColor}
            />)}
        </div>
      </div>
    )
  }
}
