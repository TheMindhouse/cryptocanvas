import React, { Component } from 'react'
import { Row } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import { Link } from 'react-router-dom'

class Homepage extends Component {
  state = {
    activeCanvasIds: [],
    finishedCanvasIds: [],
  }

  componentDidMount () {
    this.getActiveCanvasIds()
      .then(() => this.getFinishedCanvasIds())

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
        .then(() => this.getFinishedCanvasIds())
    })

    this.props.events.push(canvasCreatedEvent)
  }

  getActiveCanvasIds = () => {
    return this.props.Contract.getCanvasIdsByState(CANVAS_STATES.active)
      .then(activeCanvasIds => this.setState({ activeCanvasIds }))
  }

  getFinishedCanvasIds = () => {
    this.props.Contract.getCanvasCount()
      .then((canvasCount) => {
        console.log('Total canvases: ' + canvasCount)
        console.log('Active canvases: ' + this.state.activeCanvasIds)
        const finishedCanvasIds = Array.from(new Array(canvasCount), (val, index) => index)
          .filter(id => !this.state.activeCanvasIds.includes(id))
        console.log('Finished canvases: ' + finishedCanvasIds)
        this.setState({ finishedCanvasIds })
      })
  }

  render () {
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="container">
            <h2>
              <b>CryptoCanvas</b> is a limited set of collectible 64x64 pixel artworks <b>living on the Ethereum blockchain</b>.
              Each canvas is created by you, the CryptoCanvas community, thus it has multiple authors, who create a
              unique piece of art by collaborating together.
            </h2>
          </Row>
        </div>
        <Row className="container" style={{ textAlign: 'center' }}>
          <h1><b>Canvases Available for Painting</b></h1>
          <h3>They are still not finished, so you can jump in and paint some pixels!</h3>
          <h5>or read <Link to="/about">How it works</Link></h5>
          <br /><br />
          <ActiveCanvases activeCanvasIds={this.state.activeCanvasIds} />
        </Row>
      </div>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withEvents(withWeb3(Homepage))
