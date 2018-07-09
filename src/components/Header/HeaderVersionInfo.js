// @flow
import * as React from 'react'
import { METAMASK_NETWORKS } from '../../constants/metamask'
import { CONFIG } from '../../config'
import './styles/HeaderVersionInfo.css'

const MainVersion = () => (
  <div>
    <span className="HeaderVersionInfo__Version HeaderVersionInfo__Version--main">Main Net</span>
    <span className="HeaderVersionInfo__Caption">Play around for free on <a href="https://rinkeby.cryptocanvas.art">rinkeby.cryptocanvas.art</a></span>
  </div>
)

const TestnetVersion = () => (
  <div>
    <span className="HeaderVersionInfo__Version HeaderVersionInfo__Version--testnet">Rinkeby</span>
    <span className="HeaderVersionInfo__Caption">Check out Main Net version at <a href="https://cryptocanvas.art">cryptocanvas.art</a></span>
  </div>
)

const HeaderVersionInfo = () => {
  return (
    <div className="HeaderVersionInfo">
      {
        CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.main &&
        <MainVersion />
      }
      {
        CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.rinkeby &&
        <TestnetVersion />
      }
    </div>
  )
}

export { HeaderVersionInfo }
