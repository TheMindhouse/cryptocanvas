import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import App from './containers/App'
import { unregister } from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
