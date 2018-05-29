import React, { Component } from 'react'
import { Row, Spin } from 'antd'
import withEvents from '../hoc/withEvents'
import withWeb3 from '../hoc/withWeb3'
import FinishedCanvases from './Homepage/FinishedCanvases'
import { CANVAS_STATES } from '../models/CanvasState'
import BiddingCanvases from './Homepage/BiddingCanvases'
import './styles/Marketplace.css'
import { setDocumentTitle } from '../helpers/utils'

class Marketplace extends Component {
  state = {
    biddingCanvasIds: null,
    completedCanvasIds: null,
  }

  componentDidMount () {
    setDocumentTitle('Marketplace')
    this.getBiddingCanvasIds()
    this.getCompletedCanvasIds()
  }

  onBiddingFinished = (canvasId) => {
    const biddingCanvasIds = this.state.biddingCanvasIds.filter(id => id !== canvasId)
    const completedCanvasIds = [ ...this.state.completedCanvasIds, canvasId ]
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
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="container">
            <h1><b>Canvas Auctions</b></h1>
            <h3>
              A canvas is put up for auction when all its pixels are set.<br />
              An auction determines the first owner, whose winning bid is distributed across all painters.</h3>
          </Row>
        </div>

        <Row className="container text-center">
          {!this.state.biddingCanvasIds && <div style={{ marginBottom: 50 }}><Spin /></div>}
          {
            this.state.biddingCanvasIds && (
              this.state.biddingCanvasIds.length > 0
                ? <BiddingCanvases
                  canvasIds={this.state.biddingCanvasIds}
                  onBiddingFinished={this.onBiddingFinished}
                />
                : <p className="NoCanvasInfo">No canvases here.</p>
            )
          }
        </Row>

        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="container">
            <h1><b>Canvas Marketplace</b></h1>
            <h3>
              These paintings were sold on an auction and already have an owner.<br/>
              You can make an offer to buy one or accept an offer from its owner.
            </h3>
          </Row>
        </div>

        <Row className="container text-center">
          {!this.state.completedCanvasIds && <Spin />}
          {
            this.state.completedCanvasIds && (
              this.state.completedCanvasIds.length > 0
                ? <FinishedCanvases canvasIds={this.state.completedCanvasIds} />
                : <p className="NoCanvasInfo">No finished canvases yet.</p>
            )
          }
        </Row>
      </div>
    )
  }
}

Marketplace.propTypes = {}
Marketplace.defaultProps = {}

export default withEvents(withWeb3(Marketplace))
