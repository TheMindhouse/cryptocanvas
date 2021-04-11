import React, { Component } from 'react'
import { Row, Spin, Tooltip } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import { Link } from 'react-router-dom'
import Marketplace from './Marketplace'
import { setDocumentTitle } from '../helpers/utils'
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
      // console.log('[EVENT] New canvas created')
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
          <Row className="Homepage__header container">
            <h1><b>Canvases Available for Painting</b></h1>
            <h3>
              Paint a portion of a canvas and get a share of its price after it's sold on an auction.<br />
              <Link to="/about">How it works?</Link></h3>
          </Row>
        </div>
        <Row className="container text-center">
          {!this.state.activeCanvasIds && <div style={{ margin: '70px 0 100px' }}><Spin /></div>}
          {this.state.activeCanvasIds && <ActiveCanvases activeCanvasIds={this.state.activeCanvasIds} />}
        </Row>
        <Marketplace />
      </div>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withEvents(withWeb3(Homepage))
