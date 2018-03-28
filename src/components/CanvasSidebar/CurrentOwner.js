import React from 'react'
import PropTypes from 'prop-types'
import { cutAddress } from '../../helpers/strings'
import { Alert } from 'antd'

const CurrentOwner = (props) => {
  return (
    <div>
      <h2>Current Owner</h2>
      <h3>{cutAddress(props.canvasOwner)}</h3>
      { props.isUserCanvasOwner &&
      <Alert message="You are the owner of this Canvas!" type="success" showIcon />
      }
    </div>
  )
}

CurrentOwner.propTypes = {}
CurrentOwner.defaultProps = {}

export default CurrentOwner
