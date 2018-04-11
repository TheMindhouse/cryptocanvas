import React, { Component } from 'react'
import { Divider, Row } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import ActiveCanvases from './Homepage/ActiveCanvases'
import FinishedCanvases from './Homepage/FinishedCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import BiddingCanvases from './Homepage/BiddingCanvases'

class Marketplace extends Component {
  state = {
    biddingCanvasIds: [],
    completedCanvasIds: [],
  }

  componentDidMount () {
    this.getBiddingCanvasIds()
    this.getCompletedCanvasIds()
  }

  onBiddingFinished = (canvasId) => {
    const biddingCanvasIds = this.state.biddingCanvasIds.filter(id => id !== canvasId)
    const completedCanvasIds = [...this.state.completedCanvasIds, canvasId]
    this.setState({ biddingCanvasIds, completedCanvasIds })
  }

  getBiddingCanvasIds = () => {
    this.props.Contract.getCanvasIdsByState(CANVAS_STATES.bidding)
      .then(biddingCanvasIds => this.setState({ biddingCanvasIds }))
  }

  getCompletedCanvasIds = () => {
    this.props.Contract.getCanvasIdsByState(CANVAS_STATES.completed)
      .then(completedCanvasIds => this.setState({ completedCanvasIds }))
  }

  render () {
    return (
      <Row className="container">
        <h2>Initial Bidding</h2>
        <BiddingCanvases
          canvasIds={this.state.biddingCanvasIds}
          onBiddingFinished={this.onBiddingFinished}
        />
        <Divider />
        <h2>Finished Canvas Gallery</h2>
        <FinishedCanvases canvasIds={this.state.completedCanvasIds} />
      </Row>
    )
  }
}

Marketplace.propTypes = {}
Marketplace.defaultProps = {}

export default withEvents(withWeb3(Marketplace))
