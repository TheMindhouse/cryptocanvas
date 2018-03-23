import React from 'react'
import PropTypes from 'prop-types'

const CurrentOwner = (props) => {
  return (
    <div>
      <h2>Current Owner</h2>
      <h3>{props.canvasOwner}</h3>
    </div>
  )
}

CurrentOwner.propTypes = {}
CurrentOwner.defaultProps = {}

export default CurrentOwner
