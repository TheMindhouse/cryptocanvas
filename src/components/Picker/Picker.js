import React from 'react'
import { hexPalette } from '../../helpers/colors'
import PickerColor from './PickerColor'
import './Picker.css'
import { ColorPreview } from '../ColorPreview/ColorPreview'
import { Button } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'

const COLOR_WIDTH = 14
const PICKER_SIZE = COLOR_WIDTH * Math.sqrt(hexPalette.length)

export class Picker extends React.Component {
  render () {
    return (
      <div>
        <div className="Picker" style={{ width: PICKER_SIZE, height: PICKER_SIZE }}>
          {
            this.props.isDisabled &&
            <div className="Picker__DisabledOverlay">
              <span>Enable Ethereum to paint on the Canvas</span>
              <HashLink to={URLHelper.help.installingMetamask} style={{ marginTop: 14 }}>
                <Button type="primary">Show me how</Button>
              </HashLink>
            </div>
          }
          {hexPalette.map((hex, colorId) =>
            <PickerColor
              colorId={colorId}
              key={colorId}
              size={COLOR_WIDTH}
              isSelected={colorId === this.props.activeColorId}
              changeActiveColor={this.props.changeActiveColor}
            />)}
        </div>
        <ColorPreview
          colorId={this.props.activeColorId}
          style={{ width: PICKER_SIZE, margin: '10px 0 15px'}}
        />
      </div>
    )
  }
}
