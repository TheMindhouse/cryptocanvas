// @flow
import * as React from 'react'
import { CONFIG } from '../../config'
import { METAMASK_NETWORKS } from '../../constants/metamask'

type Props = {
  hash: string,
}

export const getEtherscanUrl = () => {
  switch (CONFIG.ETHEREUM_NETWORK) {
    case METAMASK_NETWORKS.rinkeby:
      return 'rinkeby.etherscan.io'
    case METAMASK_NETWORKS.main:
    default:
      return 'etherscan.io'
  }
}

class EtherscanLink extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const { hash } = this.props

    const etherscanUrl = getEtherscanUrl()
    return (
      <a href={`https://${etherscanUrl}/tx/${hash}`} target="_blank"
         className="font-monospace text-nowrap"
         rel="noopener noreferrer">{hash.substr(0, 8)}</a>
    )
  }
}

export { EtherscanLink }
