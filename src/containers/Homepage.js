import React, { Component } from 'react'
import { Divider, Row } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import FinishedCanvases from './Homepage/FinishedCanvases'
import { CANVAS_STATES } from '../models/CanvasState'

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
      <Row className="container">
        <h2>Paint</h2>
        <ActiveCanvases activeCanvasIds={this.state.activeCanvasIds} />
        <Divider />
        <h2>Finished Canvas Gallery</h2>
        <FinishedCanvases canvasIds={this.state.finishedCanvasIds} />
      </Row>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withEvents(withWeb3(Homepage))
