import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Homepage from './Homepage'
import CanvasPage from './CanvasPage'
import About from './About'
import Header from '../components/Layout/Header'
import AccountStatus from '../components/Layout/AccountStatus'
import Test from '../components/Test'
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
            <Route path='/about' component={About} />
            <Route path='/canvas/:id' component={CanvasPage} />
          </div>
        </Router>
      </Web3Provider>
    )
  }
}

export default App
