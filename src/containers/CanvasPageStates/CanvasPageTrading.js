import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CanvasStage from '../../components/Canvas/CanvasStage'
import { Row } from 'antd'
import CanvasSidebarTrading from '../../components/CanvasSidebar/CanvasSidebarTrading'

class CanvasPageTrading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pixels: [],
      isLoading: true,
    }
  }

  componentDidMount () {
    this.getCanvas()
  }

  getCanvas = () => {
    // Temporary store canvas in local storage
    const tempCanvas = window.localStorage.getItem('tempCanvas2')

    if (tempCanvas) {
      this.setState({
        pixels: JSON.parse(tempCanvas),
        isLoading: false,
      })
      return
    }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        window.localStorage.setItem('tempCanvas', JSON.stringify(pixels))
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      })
  }


  render () {
    return (
      <Row className="CanvasPage" type="flex" justify="space-around" align="top">

        {this.state.isLoading && <p>Canvas loading...</p>}

        <CanvasStage
          pixelSize={this.props.pixelSize}
          pixels={this.state.pixels}
        />

        <div>
          <CanvasSidebarTrading
            canvasId={this.props.canvasId}
            canvasOwner={this.props.canvasOwner}
          />
        </div>
      </Row>
    )
  }
}

CanvasPageTrading.propTypes = {}
CanvasPageTrading.defaultProps = {}

export default CanvasPageTrading
