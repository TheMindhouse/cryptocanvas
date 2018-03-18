import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Homepage'
import CanvasPage from './CanvasPage'
import About from './About'
import Header from '../components/Layout/Header'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>

          <Header />

          <Route exact path='/' component={CanvasPage} />
          <Route path='/about' component={About} />
          <Route path='/canvas/:id' component={CanvasPage} />
        </div>
      </Router>
    )
  }
}

export default App
