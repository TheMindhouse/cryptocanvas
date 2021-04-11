// @flow
import * as React from 'react'
import { Col, Divider, Icon, Row } from 'antd'
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
            <Link to={URLHelper.terms}>Terms of Use</Link>
            <Link to={URLHelper.contact}>Contact</Link>
          </nav>
        </Col>
        <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
          Made with &hearts; by <a href="https://mindhouse.io" target="_blank" rel="noopener noreferrer">The Mindhouse</a>
        </Col>
        {/*<Col xs={24} sm={24} md={8} style={{ textAlign: 'right' }}>*/}
        {/*  <a href="https://www.facebook.com/CryptoCanvas.art/" target="_blank" rel="noopener noreferrer"*/}
        {/*     className="Footer__facebook">*/}
        {/*    <Icon type="facebook" style={{ fontSize: 17, marginRight: 5 }}/>@CryptoCanvas.art*/}
        {/*  </a>*/}
        {/*</Col>*/}
      </Row>
    )
  }
}

export { Footer }
