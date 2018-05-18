// @flow
import * as React from 'react'
import { Icon } from 'antd'
import './styles/NetworkCheck.css'
import withWeb3 from '../../hoc/withWeb3'
import { CONFIG } from '../../config'
import { METAMASK_NETWORK_NAMES } from '../../constants/metamask'

type Props = {
  web3: {
    version: {
      getNetwork: (Function) => void,
    },
  },
}

type State = {
  networkId: ?number,
}

class NetworkCheck extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    networkId: null,
  }

  componentDidMount () {
    this.props.web3.version.getNetwork((err, netId: string) => {
      this.setState({ networkId: parseInt(netId, 10) })
    })
  }

  render () {
    if (!this.state.networkId || this.state.networkId === CONFIG.ETHEREUM_NETWORK) {
      return null
    }

    const currentNetworkName = METAMASK_NETWORK_NAMES[this.state.networkId] || 'Unknown Network'
    const desiredNetworkName = METAMASK_NETWORK_NAMES[CONFIG.ETHEREUM_NETWORK]
    return (
      <div className="NetworkCheck">
        <Icon type="exclamation-circle" className="NetworkCheck__Icon" />
        <span>
          Error: You're connected to the <b>{currentNetworkName}</b>.
          Connect MetaMask to the <b>{desiredNetworkName}</b>.
        </span>
      </div>
    )
  }
}

NetworkCheck = withWeb3(NetworkCheck)
export { NetworkCheck }
