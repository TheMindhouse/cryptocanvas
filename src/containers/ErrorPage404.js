// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'antd'

const ErrorPage404 = () => {
  return (
      <div className="containerWrapper" style={{ marginBottom: 50 }}>
        <Row className="container">
          <h1><b>Page Not Found</b></h1>
          <h3><Link to="/">Go back to homepage</Link></h3>
        </Row>
      </div>
  )
}

ErrorPage404.defaultProps = {}

export default ErrorPage404
