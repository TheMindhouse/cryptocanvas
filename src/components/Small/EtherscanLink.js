// @flow
import * as React from 'react'

type Props = {
  hash: string,
}

class EtherscanLink extends React.PureComponent<Props> {
  static defaultProps = {}
  
  render() {
    const { hash } = this.props
    return (
      <a href={`https://ropsten.etherscan.io/tx/${hash}`} target="_blank"
         className="font-monospace text-nowrap"
         rel="noopener noreferrer">{hash.substr(0, 8)}</a>
    )
  }
}

export { EtherscanLink }
