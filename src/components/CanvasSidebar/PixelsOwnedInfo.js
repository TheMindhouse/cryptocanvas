// @flow
import * as React from 'react'
import { Alert } from 'antd'
import { CONFIG } from '../../config'

type Props = {
  pixelsOwned: number,
  isCanvasFinished: boolean,
}

class PixelsOwnedInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const pixelsOwned = this.props.pixelsOwned
    const totalPixels = Math.pow(CONFIG.gridColumns, 2)
    const reward = parseFloat(1 / totalPixels * pixelsOwned).toFixed(2)

    if (this.props.isCanvasFinished) {
      return <Alert message={<b>You've painted {pixelsOwned} pixels of this canvas!</b>} type="success" />
    }

    return (
      <Alert
        message={<b>You've painted {pixelsOwned} pixels of this canvas!</b>}
        description={<span>If the canvas was sold for <b>1 ETH</b> you'd get <b>{reward} ETH</b>.</span>}
        type="success"
        showIcon
      />
    )
  }
}

export { PixelsOwnedInfo }
