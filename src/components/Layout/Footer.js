// @flow
import * as React from 'react'
import { Col, Divider, Row } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'
import './styles/Footer.css'

type Props = {}

class Footer extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <Row className="container Footer">
        <Divider />
        <Col xs={24} sm={24} md={8}>
          <nav className="Footer__nav">
            <Link to={URLHelper.about}>About</Link>
            <Link to={URLHelper.help.page}>Help</Link>
            <Link to={URLHelper.contact}>Contact</Link>
          </nav>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
          Made with &hearts; by The Mindhouse
        </Col>
      </Row>
    )
  }
}

export { Footer }
