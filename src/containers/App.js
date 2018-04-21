import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom'

import Homepage from './Homepage'
import Marketplace from './Marketplace'
import About from './About'
import CanvasPage from './CanvasPage'
import Header from '../components/Layout/Header'
import AccountStatus from '../components/AccountWidget/AccountStatus'
import { Web3Provider } from '../stores/Web3Provider'
import TransactionsProvider from '../stores/TransactionsProvider'
import { Account } from './Account'
import ErrorPage404 from './ErrorPage404'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-117937544-1')

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  return null;
};

class App extends React.Component {
  render () {
    return (
      <Web3Provider>
        <TransactionsProvider>
          <Router>
            <div>
              <Header />
              <AccountStatus />

              <Route path="/" component={logPageView} />
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path='/trade' component={Marketplace} />
                <Route path='/about' component={About} />
                <Route path='/canvas/:id' component={CanvasPage} />
                <Route path='/account/:address' component={Account} />
                <Route component={ErrorPage404} />
              </Switch>
            </div>
          </Router>
        </TransactionsProvider>
      </Web3Provider>
    )
  }
}

export default App
