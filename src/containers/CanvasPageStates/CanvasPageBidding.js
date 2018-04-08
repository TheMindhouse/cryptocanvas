import React, { Component } from 'react'
import { Row } from 'antd'
import CanvasStage from '../../components/Canvas/CanvasStage'
import CanvasSidebarBidding from '../../components/CanvasSidebar/CanvasSidebarBidding'
import withEvents from '../../hoc/withEvents'
import withWeb3 from '../../hoc/withWeb3'
import HighestBidWatcher from '../../hoc/renderProps/HighestBidWatcher'

class CanvasPageBidding extends Component {
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

        <HighestBidWatcher
          canvasId={this.props.canvasId}
          onBiddingFinished={this.props.onBiddingFinished}
          render={(state) => <CanvasSidebarBidding {...state} canvasId={this.props.canvasId} /> }
        />
      </Row>
    )
  }
}

CanvasPageBidding.propTypes = {}
CanvasPageBidding.defaultProps = {}

export default withEvents(withWeb3(CanvasPageBidding))
