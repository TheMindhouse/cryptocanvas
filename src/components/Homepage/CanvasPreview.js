import React from 'react'
import PropTypes from 'prop-types'

import './CanvasPreview.css'
import { Row, Spin } from 'antd'
import { Link } from 'react-router-dom'
import CanvasPreviewPlaceholder from './CanvasPreviewPlaceholder'

const getLinkToCanvas = (id) => `/canvas/${id}`

class CanvasPreview extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount () {

  }

  render () {
    return (
      <div className="CanvasPreview">
        <Link to={getLinkToCanvas(this.props.canvasId)}>
          {this.state.isLoading && <CanvasPreviewPlaceholder />}
        </Link>
        <Row gutter={20} type="flex" justify="space-between" className="CanvasPreview__info">
          <h3>Canvas #{this.props.canvasId}</h3>
          <h3>90%</h3>
        </Row>
      </div>
    )
  }
}

CanvasPreview.propTypes = {}
CanvasPreview.defaultProps = {}

export default CanvasPreview
