import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import withWeb3 from '../hoc/withWeb3'
import CanvasPreview from '../components/Homepage/CanvasPreview'

class Homepage extends Component {
  state = {
    activeCanvasIds: [],
  }

  componentDidMount () {
    this.getActiveCanvasIds()
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
        </Row>

        <h2>Canvas Gallery</h2>
      </Row>
    )
  }
}

Homepage.propTypes = {}
Homepage.defaultProps = {}

export default withWeb3(Homepage)
