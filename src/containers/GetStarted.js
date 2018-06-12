// @flow
import * as React from 'react'
import pixelBg from '../assets/images/pixels.png'
import { URLHelper } from '../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import { Button, Col, Icon, Row } from 'antd'
import { Link } from 'react-router-dom'
import { FbMessengerHelper } from '../helpers/FbMessengerHelper'

class GetStarted extends React.PureComponent<{}> {
  componentDidMount () {
    FbMessengerHelper.showGetStartedDialog()
  }

  render () {
    return (
      <div className="BetaInfo" style={{ backgroundImage: `url(${pixelBg})` }}>
        <div className="container">
          <h1><b>Get Started With BETA</b></h1>

          <h3 style={{ maxWidth: 700 }}>
            Beta runs exactly the same code as Live version will.
          </h3>
          <h3 style={{ maxWidth: 700 }}>
            The difference is that <b>every operation during Beta is free</b> because it's performed on the Test Network
            with Test Ether and the paintings are temporary.
          </h3>

          <Row style={{ marginTop: 50 }}>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 10, offset: 7 }}>
              <Row type="flex">
                <h2><b>1.&nbsp;</b></h2>
                <div>
                  <h2 style={{ margin: 0 }}><b>Install MetaMask</b></h2>
                  <p className="text-smaller">
                    <HashLink to={URLHelper.help.installingMetamask}>Help: Installing MetaMask</HashLink>
                  </p>
                </div>
              </Row>
              <Row type="flex" style={{ flexWrap: 'nowrap' }}>
                <h2><b>2.&nbsp;</b></h2>
                <div>
                  <h2 style={{ margin: 0 }}>
                    <b>
                      Get free Test Ether&nbsp;
                      <a href="https://faucet.rinkeby.io/" target="_blank" rel="noopener noreferrer">
                        here
                      </a>
                    </b>
                  </h2>
                  <p className="text-smaller">
                    Follow instructions on the website to receive Test Ether to your wallet in MetaMask.
                  </p>
                </div>
              </Row>
              <Row type="flex" style={{ flexWrap: 'nowrap' }}>
                <h2><b>3.&nbsp;</b></h2>
                <div>
                  <h2 style={{ margin: 0 }}>
                    <b>
                      Paint and trade canvases
                    </b>
                  </h2>
                  <p className="text-smaller">
                    Have fun!
                  </p>
                </div>
              </Row>

              <br />

              <Link to={URLHelper.canvas(0)}>
                <Button type="primary">
                  Go to your first Canvas <Icon type="arrow-right" />
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export { GetStarted }
