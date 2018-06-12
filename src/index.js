import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import App from './containers/App'
import { unregister } from './registerServiceWorker'
import { CONFIG } from './config'
import { METAMASK_NETWORKS } from './constants/metamask'
import { AppLaunchPlaceholder } from './containers/AppLaunchPlaceholder'

if (
  CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.main &&
  Date.now() < CONFIG.SHARED.LIVE_LAUNCH_DATE
) {
  ReactDOM.render(<AppLaunchPlaceholder />, document.getElementById('root'))
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}

unregister()
