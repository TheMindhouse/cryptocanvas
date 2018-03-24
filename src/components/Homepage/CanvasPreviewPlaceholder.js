import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

import './styles/CanvasPreviewPlaceholder.css'

const CanvasPreviewPlaceholder = (props) => {
  return (
    <div className="CanvasPreviewPlaceholder">
      <div className="CanvasPreviewPlaceholder__spinner">
        <Spin />
      </div>
    </div>
  )
}

CanvasPreviewPlaceholder.propTypes = {}
CanvasPreviewPlaceholder.defaultProps = {}

export default CanvasPreviewPlaceholder
