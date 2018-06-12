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
    if (typeof this.props.ethPrice === undefined) {
      return null
    }

    const priceInUSD = this.props.ethPrice
      ? this.props.eth * this.props.ethPrice
      : 0

    return (
      <span>${priceInUSD.toFixed(2)}</span>
    )
  }
}

EthToUsd = withWeb3(EthToUsd)
export { EthToUsd }
