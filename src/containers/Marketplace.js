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
            <h2>
              Buy and Sell finished artworks<br />
              with <b>proof of ownership</b> stored forever <b>on the Ethereum blockchain</b>.
            </h2>
          </Row>
        </div>

        <Row className="container text-center">
          <h1><b>Initial Bidding</b></h1>
          <h3>Waiting for the first owner, whose winning bid will be distributed across all the painters</h3>
          <br /><br />
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

        <Row className="container text-center">
          <h1><b>Finished Canvas Gallery</b></h1>
          <h3>You can admire them and you can buy them</h3>
          <br /><br />
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
