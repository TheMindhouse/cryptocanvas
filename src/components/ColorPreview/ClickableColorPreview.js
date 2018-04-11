// @flow
import * as React from 'react'
import { ColorPreview } from './ColorPreview'
import { Tooltip } from 'antd'

type Props = {
  colorId: number,
  onClick: Function,
}

class ClickableColorPreview extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <Tooltip title="Click to copy" onClick={this.props.onClick}>
        <div>
          <ColorPreview colorId={this.props.colorId} style={{ cursor: 'pointer' }} />
        </div>
      </Tooltip>
    )
  }
}

export { ClickableColorPreview }
