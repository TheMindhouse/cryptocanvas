import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'

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
import { Help } from './Help'
import { Footer } from '../components/Layout/Footer'
import Contact from './Contact'
import TermsOfUse from './TermsOfUse'
import Intro from './Intro'
import { SelectedPixelsProvider } from '../stores/SelectedPixelsProvider'

const hostname = window && window.location && window.location.hostname
if (hostname === 'cryptocanvas.art') {
  ReactGA.initialize('UA-117937544-1')
} else if (hostname === 'rinkeby.cryptocanvas.art') {
  ReactGA.initialize('UA-117937544-4')
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
  return null
}

class App extends React.Component {
  render () {
    return (
      <Web3Provider>
        <TransactionsProvider>
          <Router>
            <ScrollToTop>
              <div>
                <div className="AppContent">
                  <Header />
                  <AccountStatus />

                  <Route path="/" component={logPageView} />
                  <Switch>
                    <Route exact path='/' component={Intro} />
                    <Route path='/gallery' component={Homepage} />
                    <Route path='/trade' component={Marketplace} />
                    <Route path='/about' component={About} />
                    <SelectedPixelsProvider>
                      <Route path='/canvas/:id' component={CanvasPage} />
                    </SelectedPixelsProvider>
                    <Route path='/account/:address' component={Account} />
                    <Route path='/help' component={Help} />
                    <Route path='/terms-of-use' component={TermsOfUse} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/404' component={ErrorPage404} />
                    <Route component={ErrorPage404} />
                  </Switch>
                </div>
                <Footer />
              </div>
            </ScrollToTop>
          </Router>
        </TransactionsProvider>
      </Web3Provider>
    )
  }
}

export default App
