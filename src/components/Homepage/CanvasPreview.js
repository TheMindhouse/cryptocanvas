import React from 'react'

import './styles/CanvasPreview.css'
import { Row } from 'antd'
import { Link } from 'react-router-dom'
import CanvasPreviewPlaceholder from './CanvasPreviewPlaceholder'
import withWeb3 from '../../hoc/withWeb3'
import CanvasPreviewImage from './CanvasPreviewImage'
import { getPercentOfPixelsCompleted } from '../../helpers/colors'
import { LocalStorageManager } from '../../localStorage'

const getLinkToCanvas = id => `/canvas/${id}`

class CanvasPreview extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      pixels: [],
    }
  }

  componentDidMount () {
    this.getCanvas()
  }

  getCanvas = () => {
    // Get cached canvas pixels from Local Storage
    const canvasPixelsCache = LocalStorageManager.canvasPixels.getCanvasPixels(this.props.canvasId)
    if (canvasPixelsCache) {
      return this.setState({
        pixels: canvasPixelsCache,
        isLoading: false,
      })
    }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        // Update pixels cache in Local Storage
        LocalStorageManager.canvasPixels.updateCanvasCache({
          canvasId: this.props.canvasId,
          pixelsMap: pixels,
          withExpirationDate: getPercentOfPixelsCompleted(pixels) !== 100
        })
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
      <div className="CanvasPreview">
        <Link to={getLinkToCanvas(this.props.canvasId)}>
          {this.state.isLoading && <CanvasPreviewPlaceholder />}
          {!this.state.isLoading && <CanvasPreviewImage pixels={this.state.pixels} />}
        </Link>
        <Row gutter={20} type="flex" justify="space-between" className="CanvasPreview__info">
          <h3>Canvas #{this.props.canvasId}</h3>
          {
            this.props.showPercentCompleted && this.state.pixels.length > 0 &&
            <h3>{getPercentOfPixelsCompleted(this.state.pixels)}%</h3>
          }
        </Row>
        {this.props.extraRender && this.props.extraRender(this.state)}
      </div>
    )
  }
}

CanvasPreview.propTypes = {}
CanvasPreview.defaultProps = {}

export default withWeb3(CanvasPreview)
