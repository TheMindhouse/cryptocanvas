import React from 'react'
import { cutAddress } from '../../helpers/strings'
import { Alert } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'

const CurrentOwner = (props) => {
  return (
    <div>
      <h2><b>Current Owner</b></h2>
      <Link to={URLHelper.account(props.canvasOwner)}><h3>{cutAddress(props.canvasOwner)}</h3></Link>
      {
        props.isUserCanvasOwner &&
        <Alert
          message="You are the owner of this Canvas!"
          description="You can offer it for sale, accept buy offers or simply hang it on a wall and admire."
          type="success"
          showIcon
        />
      }
    </div>
  )
}

CurrentOwner.propTypes = {}
CurrentOwner.defaultProps = {}

export default CurrentOwner
