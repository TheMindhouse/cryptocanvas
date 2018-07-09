// @flow
import * as React from 'react'
import './styles/NetworkCheck.css'
import withWeb3 from '../../hoc/withWeb3'
import { CONFIG } from '../../config'
import { METAMASK_NETWORK_NAMES, METAMASK_NETWORKS } from '../../constants/metamask'

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
    const { networkId } = this.state
    if (!networkId || networkId === CONFIG.ETHEREUM_NETWORK) {
      return null
    }

    const currentNetworkName = METAMASK_NETWORK_NAMES[ networkId ] || 'Unknown Network'
    return (
      <div className="NetworkCheck">
        <span>
          {
            CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.main &&
            networkId === METAMASK_NETWORKS.rinkeby &&
            <span>
                Your wallet is connected to the {currentNetworkName}.
                To play with CryptoCanvas on Rinkeby, please switch to <a
              href="https://rinkeby.cryptocanvas.art">rinkeby.cryptocanvas.art</a>
              </span>
          }
          {
            CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.rinkeby &&
            networkId === METAMASK_NETWORKS.main &&
              <span>
               You are visiting Rinkeby version of the page but your wallet is connected to the {currentNetworkName}.
                To use CryptoCanvas, please switch to <a
              href="https://cryptocanvas.art">cryptocanvas.art</a>
              </span>
          }
        </span>
      </div>
    )
  }
}

NetworkCheck = withWeb3(NetworkCheck)
export { NetworkCheck }
