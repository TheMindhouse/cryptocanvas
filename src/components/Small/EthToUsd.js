// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'

type Props = {
  eth: number,
  // withWeb3
  ethPrice: ?number,
}

class EthToUsd extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    if (!this.props.ethPrice) {
      return null
    }

    const priceInUSD = this.props.eth * this.props.ethPrice

    return (
      <span>${priceInUSD.toFixed(2)}</span>
    )
  }
}

EthToUsd = withWeb3(EthToUsd)
export { EthToUsd }
