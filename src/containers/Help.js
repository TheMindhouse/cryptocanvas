// @flow
import * as React from 'react'
import { Anchor, Col, Row } from 'antd'
import { URLHelper } from '../helpers/URLhelper'
import { Link } from 'react-router-dom'

type Props = {}

class Help extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <div className="container">
            <h1><b>Help</b></h1>
            <h3>
              This page is to help you solve more detailed issues.<br />
              If you're looking for a general overview of how CryptoCanvas works,
              please see <Link to={URLHelper.about}>About page</Link>
            </h3>
          </div>
        </div>
        <Row className="container About">
          <Col span={8}>
            <Anchor style={{ paddingTop: 20 }}>
              <Anchor.Link href="#installing-metamask" title="Installing MetaMask" />
              <Anchor.Link href="#getting-ether" title="Getting Ether" />
            </Anchor>
          </Col>
          <Col span={16}>
            <h2 id="installing-metamask"><b>Installing MetaMask</b></h2>
            <p>To do</p>
            <h2 id="getting-ether"><b>Getting Ether</b></h2>
            <p>To do</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export { Help }
