import React, { Component } from 'react'
import { Row, Spin } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import { Link } from 'react-router-dom'
import Marketplace from './Marketplace'
import { setDocumentTitle } from '../helpers/utils'
import Mona from '../assets/images/mona.png'
import './styles/Homepage.css'

class Homepage extends Component {
  state = {
    activeCanvasIds: null,
  }

  componentDidMount () {
    setDocumentTitle(null)

    this.getActiveCanvasIds()

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  watchForChanges = (blockNumber) => {
    const canvasCreatedEvent = this.props.Contract.CanvasCreatedEvent({}, { fromBlock: blockNumber, toBlock: 'latest' })

    // watch for changes
    canvasCreatedEvent.watch(() => {
      console.log('[EVENT] New canvas created')
      this.getActiveCanvasIds()
    })

    this.props.addEvents(canvasCreatedEvent)
  }

  getActiveCanvasIds = () => {
    return this.props.Contract.getCanvasIdsByState(CANVAS_STATES.active)
      .then(activeCanvasIds => this.setState({ activeCanvasIds }))
  }

  render () {
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="Homepage__header container" type="flex" align="middle">
            <img src={Mona} className="Homepage__Mona" />
            <h2 className="Homepage__quote">
              <blockquote>
                There is an empty CryptoCanvas.<br />
                You may place a tile upon it and it will be stored on the blockchain.<br />
                Individually you can create something. <br />
                Together you can create something more.
              </blockquote>
              <small>- <i>Someone in some Place on the Internet</i></small>
            </h2>
          </Row>
        </div>
        <Row className="container" style={{ textAlign: 'center', marginBottom: 100 }}>
          <h1><b>Canvases Available for Painting</b></h1>
          <h3>Paint some pixels and become the Blockchain Picasso (or read <Link to="/about">how it works</Link>)</h3>
          <br /><br />
          {!this.state.activeCanvasIds && <Spin />}
          {this.state.activeCanvasIds && <ActiveCanvases activeCanvasIds={this.state.activeCanvasIds} /> }
        </Row>
        <Marketplace />
      </div>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withEvents(withWeb3(Homepage))
