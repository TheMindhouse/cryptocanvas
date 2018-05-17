// @flow
import * as React from 'react'
import { ColorPreview } from './ColorPreview'
import { Tooltip } from 'antd'
import withWeb3 from '../../hoc/withWeb3'

type Props = {
  colorId: number,
  onClick: Function,
  // withWeb3
  account: ?string,
}

class ClickableColorPreview extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    if (!this.props.account) {
      return (
        <ColorPreview colorId={this.props.colorId} />
      )
    }

    return (
      <Tooltip title="Click to copy" onClick={this.props.onClick}>
        <div>
          <ColorPreview colorId={this.props.colorId} style={{ cursor: 'pointer' }} />
        </div>
      </Tooltip>
    )
  }
}

ClickableColorPreview = withWeb3(ClickableColorPreview)
export { ClickableColorPreview }
