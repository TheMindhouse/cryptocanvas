// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'antd'
import { setDocumentTitle } from '../helpers/utils'

class ErrorPage404 extends React.PureComponent<{}> {
  componentDidMount () {
    setDocumentTitle('Page Not Found')
  }

  render () {
    return (
      <div className="containerWrapper" style={{ marginBottom: 50 }}>
        <Row className="container">
          <h1><b>Page Not Found</b></h1>
          <h3><Link to="/">Go back to homepage</Link></h3>
        </Row>
      </div>
    )
  }
}

export default ErrorPage404
