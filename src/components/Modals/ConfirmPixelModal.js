import React from 'react'
import PropTypes from 'prop-types'
import { hexPalette } from '../../helpers/colors'

const ConfirmPixelModal = ({x, y, color }) => {
  return (
    <div>
      Coordinates: ({x}, {y})<br />
      Color: #{color}
      <div style={{ width: '30px', height: '30px', backgroundColor: hexPalette[color]}} />
    </div>
  )
}

ConfirmPixelModal.propTypes = {}
ConfirmPixelModal.defaultProps = {}

export default ConfirmPixelModal
