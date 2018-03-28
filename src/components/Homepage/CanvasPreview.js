import React from 'react'

import './styles/CanvasPreview.css'
import { Row } from 'antd'
import { Link } from 'react-router-dom'
import CanvasPreviewPlaceholder from './CanvasPreviewPlaceholder'
import withWeb3 from '../../hoc/withWeb3'
import CanvasPreviewImage from './CanvasPreviewImage'
import { getPercentOfPixelsCompleted } from '../../helpers/colors'

const getLinkToCanvas = id => `/canvas/${id}`
const getLocalStorageName = id => `CanvasPreviewCache-#${id}`

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
    // Temporary store canvas in local storage
    // const tempCanvas = window.localStorage.getItem(getLocalStorageName(this.props.canvasId))
    //
    // if (tempCanvas) {
    //   this.setState({
    //     pixels: JSON.parse(tempCanvas),
    //     isLoading: false,
    //   })
    //   return
    // }

    this.props.Contract.getCanvas(this.props.canvasId)
      .then((pixels) => {
        this.setState({
          pixels,
          isLoading: false,
        })
        window.localStorage.setItem(getLocalStorageName(this.props.canvasId), JSON.stringify(pixels))
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
          <h3>{getPercentOfPixelsCompleted(this.state.pixels)}</h3>
        </Row>
      </div>
    )
  }
}

CanvasPreview.propTypes = {}
CanvasPreview.defaultProps = {}

export default withWeb3(CanvasPreview)
