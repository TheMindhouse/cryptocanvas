import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Divider, Row } from 'antd'
import withWeb3 from '../hoc/withWeb3'
import CanvasPreview from '../components/Homepage/CanvasPreview'
import CreateCanvas from '../components/Homepage/CreateCanvas'

const MAX_ACTIVE_CANVASES = 10

class Homepage extends Component {
  state = {
    activeCanvasIds: [],
  }

  componentDidMount () {
    this.getActiveCanvasIds()
    this.watchForChanges()
  }

  watchForChanges = () => {
    const { blockNumber } = this.props.web3.eth
    const canvasCreatedEvent = this.props.Contract.CanvasCreatedEvent({}, { fromBlock: blockNumber, toBlock: 'latest' })

    // watch for changes
    canvasCreatedEvent.watch((error, result) => {
      console.log('[EVENT] New canvas created');
      this.getActiveCanvasIds()
    })
  }

  getActiveCanvasIds = () => {
    this.props.Contract.getActiveCanvasIds().then(activeCanvasIds => this.setState({ activeCanvasIds }))
  }

  render () {
    return (
      <Row className="container">
        <Row gutter={100}>
          <h2>Paint</h2>
          {this.state.activeCanvasIds.map((canvasId, index) =>
            <Col span={6} key={index}>
              <CanvasPreview canvasId={canvasId} />
            </Col>
          )}
          {this.state.activeCanvasIds.length < MAX_ACTIVE_CANVASES &&
          <Col span={6}>
            <CreateCanvas />
          </Col>
          }
        </Row>

        <br />
        <Divider />

        <h2>Canvas Gallery</h2>
      </Row>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withWeb3(Homepage)
