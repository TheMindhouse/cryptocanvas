// @flow
import * as React from 'react'
import './styles/ColorPreview.css'
import { hexPalette } from '../../helpers/colors'

type Props = {
  colorId: number,
  style: ?Object,
}

class ColorPreview extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <div className="ColorPreview" style={this.props.style}>
        <div className="ColorPreview__index">
          <p>color</p>
          {
            this.props.colorId > 0
              ? <span>#{this.props.colorId}</span>
              : <span>no color</span>
          }
        </div>
        {
          this.props.colorId > 0 &&
          <div className="ColorPreview__color" style={{
            backgroundColor: hexPalette[ this.props.colorId ]
          }} />
        }
      </div>
    )
  }
}

export { ColorPreview }
