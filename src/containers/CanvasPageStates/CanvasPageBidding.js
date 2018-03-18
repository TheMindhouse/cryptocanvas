import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from 'antd/es/grid/row'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebar from '../../components/CanvasSidebar/CanvasSidebar'
import CanvasSidebarBidding from '../../components/CanvasSidebar/CanvasSidebarBidding'

class CanvasPageBidding extends Component {
  constructor (props) {
    super(props)

    this.canvasId = this.props.canvasId

    this.state = {
      pixels: [],
      isLoading: true,
    }
  }

  componentDidMount () {
    // Temporary store canvas in local storage
    const tempCanvas = window.localStorage.getItem('tempCanvas')

    if (tempCanvas) {
      this.setState({
        pixels: JSON.parse(tempCanvas),
        isLoading: false,
      })
      return
    }

    this.props.Contract.getArtwork(0, { gas: 3000000 }, (error, result) => {
      if (!error) {
        const pixels = result.map(color => parseInt(color))
        this.setState({
          pixels,
          isLoading: false,
        })

        window.localStorage.setItem('tempCanvas', JSON.stringify(pixels))
      }
      else {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      }
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
          <CanvasSidebarBidding canvasId={this.canvasId} />
        </div>
      </Row>
    )
  }
}

CanvasPageBidding.propTypes = {}
CanvasPageBidding.defaultProps = {}

export default CanvasPageBidding
