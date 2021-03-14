// @flow
import * as React from 'react'
import { METAMASK_NETWORKS } from '../../constants/metamask'
import { CONFIG } from '../../config'
import './styles/HeaderVersionInfo.css'

const MainVersion = () => (
  <div>
    <a href="https://cryptocanvas.art">
      <span className={`HeaderVersionInfo__Version HeaderVersionInfo__Version--main 
      ${CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.main ? 'HeaderVersionInfo__Version--inactive' : ''}`}>Main Network</span>
    </a>
  </div>
)

const TestnetVersion = () => (
  <div>
    <a href="https://rinkeby.cryptocanvas.art">
      <span className={`HeaderVersionInfo__Version HeaderVersionInfo__Version--testnet 
      ${CONFIG.ETHEREUM_NETWORK !== METAMASK_NETWORKS.rinkeby ? 'HeaderVersionInfo__Version--inactive' : ''}`}>Rinkeby Testnet</span>
    </a>
  </div>
)

const HeaderVersionInfo = () => {
  return (
    <div className="HeaderVersionInfo">
        <MainVersion />
        <TestnetVersion />
    </div>
  )
}

export { HeaderVersionInfo }
