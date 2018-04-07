import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Homepage from './Homepage'
import Marketplace from './Marketplace'
import About from './About'
import CanvasPage from './CanvasPage'
import Header from '../components/Layout/Header'
import AccountStatus from '../components/Account/AccountStatus'
import { Web3Provider } from '../stores/Web3Provider'

class App extends React.Component {
  render () {
    return (
      <Web3Provider>
        <Router>
          <div>
            <Header />
            <AccountStatus />

            <Route exact path='/' component={Homepage} />
            <Route path='/trade' component={Marketplace} />
            <Route path='/about' component={About} />
            <Route path='/canvas/:id' component={CanvasPage} />
          </div>
        </Router>
      </Web3Provider>
    )
  }
}

export default App
